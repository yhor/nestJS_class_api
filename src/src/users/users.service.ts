import { Injectable, NotFoundException } from '@nestjs/common';
import getSchool from './../db/schools/getSchool';
import { School } from './../schools/entities/school.entity';
import delUser from './../db/users/delUsers';
import getUser from './../db/users/getUser';
import getUsers from './../db/users/getUsers';
import putUser from './../db/users/putUsers';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  userList() {
    return getUsers();
  }

  async userCreate(createUserDto: CreateUserDto) {
    await getUser(createUserDto, false);
    await putUser(createUserDto);

    return `${createUserDto.name}(${createUserDto.grade}) 가 등록되었습니다`;
  }

  async userDelete(createUserDto: CreateUserDto) {
    await getUser(createUserDto);
    await delUser(createUserDto);

    return `${createUserDto.name}(${createUserDto.grade}) 가 삭제되었습니다`;
  }

  async subList(createUserDto: CreateUserDto) {
    const user = await getUser(createUserDto, true);
    const subs = user.subs
      .filter((sub) => sub.is_sub === 'Y')
      .map((obj) => `${obj.name}(${obj.area})`);

    return subs.length === 0 ? '구독중인 학교가 없습니다' : subs;
  }

  async subDetail(name, area ,createUserDto: CreateUserDto) {
    const user = await getUser(createUserDto, true);
    const school = await getSchool({name, area});
    
    if (!school.news) return '구독중인 학교에 뉴스가 없습니다.';

    return this.getNewsList(name, area, user, school);
  }

  async subCreate(createUserDto: CreateUserDto) {
    const user = await getUser(createUserDto, true);
    const schoolInfo: School = {
      area: createUserDto.subs['area'],
      name:createUserDto.subs['name']
    }
    await getSchool(schoolInfo);

    user.subs = user.subs || [];

    user.subs.forEach((sub) => {
      if (sub.area === schoolInfo.area 
        && sub.name === schoolInfo.name
        && sub.is_sub === 'Y') {
        throw new NotFoundException('이미구독중입니다');
      }
    })

    user.subs.push({
      ...schoolInfo,
	    sub_start_date: new Date(),
      is_sub: 'Y'
    });

    await putUser(user);

    return `${createUserDto.name} ${schoolInfo.name}(${schoolInfo.area}) 구독 성공`;

  }

  async subCancel(createUserDto: CreateUserDto) {
    const user = await getUser(createUserDto, true);
    const schoolInfo: School = {
      area: createUserDto.subs['area'],
      name:createUserDto.subs['name']
    }
    await getSchool(schoolInfo);

    user.subs = user.subs || [];

    user.subs = user.subs.map((sub) => {
      if (sub.area === schoolInfo.area 
        && sub.name === schoolInfo.name
        && sub.is_sub === 'Y') {
          sub.is_sub = 'N';
          sub.sub_end_date = new Date();
      }
      return sub;
    })

    await putUser(user);

    return `${createUserDto.name} ${schoolInfo.name}(${schoolInfo.area}) 구독취소`;
  }
  
  getNewsList (name: string, area: string, user: User, school: School) {

    const news = [];
    let lastSubStartDate;
    
    const subList = user.subs.filter((sub) => {
      if (sub.name === name && sub.area === area) {
        if (sub.is_sub !=='Y') return true;
        lastSubStartDate = sub.sub_start_date;
        return false;
      }
    });

    for (let i = school.news.length - 1; i >= 0; i--) {
      if (school.news[i].is_delete === 'Y') continue;

      const { reg_date, id, subject, content } = school.news[i];

      if (lastSubStartDate && reg_date > lastSubStartDate) {
        news.push({ id, subject, content, reg_date }); 
        continue;
      }
      subList.forEach((sub) => {
        if ( sub.sub_start_date <= reg_date && reg_date <= sub.sub_end_date) {
          news.push({ id, subject, content, reg_date }); 
        }
      });
    }
  }
}
