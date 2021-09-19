import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';

import getSchools from './../db/schools/getSchools';
import putSchool from '../db/schools/putSchool';
import getSchool from './../db/schools/getSchool';

@Injectable()
export class SchoolService {

  async create(createSchoolDto: CreateSchoolDto) {
    await getSchool(createSchoolDto, false);

    await putSchool(createSchoolDto);

    return `${createSchoolDto.name}(${createSchoolDto.area})학교가 등록되었습니다`;
  }

  findSchools() {
    return getSchools();
  }

  async findOne(updateSchoolDto: UpdateSchoolDto) {
    const { area, name } = updateSchoolDto;
    
    return await getSchool({area, name});
  }

  async newsCreate(updateSchoolDto: UpdateSchoolDto) {
    const { area, name, news } = updateSchoolDto;
    const school = await getSchool({ area, name });

    const id = school.news ? school.news.length + 1 : 1;
    school.news = school.news || [];
    school.news.push({
      id,
      subject: news['subject'],
      content: news['content'],
      reg_date: new Date(),
      is_delete: 'N'
    });

    await putSchool(school);

    return `${name}(${area})의 ${id}번 뉴스가 등록되었습니다`;
  }

  async newsUpdate(id: number, updateSchoolDto: UpdateSchoolDto) {
    const { area, name, news } = updateSchoolDto;
    const school = await getSchool({ area, name });
    const modifyNews = school.news[id - 1];

    school.news[id - 1] = {
      ...modifyNews,
      ...news,
      update_date: new Date(),
    }
    
    await putSchool(school);

    return `${name}(${area})의 ${news['id']}번 뉴스가 수정되었습니다`;
  }

  async newDelete(id: number, updateSchoolDto: UpdateSchoolDto) {
    const { area, name } = updateSchoolDto;
    const school = await getSchool({ area, name });

    if (school.news.length === 0) new NotFoundException(`삭제할 뉴스가 없습니다..`);

    school.news[id - 1].is_delete = 'Y';
    school.news[id - 1].delete_date = new Date();

    await putSchool(school);

    return `${name}(${area})의 ${id}번 뉴스가 삭제되었습니다`;
  }
}
