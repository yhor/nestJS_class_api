import { Injectable } from '@nestjs/common';
import getSchool from './../db/schools/getSchool';
import { School } from './../schools/entities/school.entity';
import delUser from './../db/users/delUsers';
import getUser from './../db/users/getUser';
import getUsers from './../db/users/getUsers';
import putUser from './../db/users/putUsers';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

  subList(createUserDto: CreateUserDto) {
    return getUser(createUserDto, true);
  }

  async subCreate(createUserDto: CreateUserDto) {
    const user = await getUser(createUserDto, true);
    const schoolInfo: School = {
      area: createUserDto.subs['area'],
      name:createUserDto.subs['name']
    }
    await getSchool(schoolInfo);

    //추가로직 기존에 있으면 등록하지 않음
    //없으면 추가

    // if (user.subs) {

    // } else {
    // }

    // await putUser(createUserDto);

    return `${createUserDto.name} ${schoolInfo.name}(${schoolInfo.area}) 구독 성공`;

  }

  // findAll() {
  //   return [];
  // }

  // findOne() {
  //   return [];
  // }

  // sub(area: string, name: string) {
  //   return `${name}(${area}) 구독완료`;
  // }

  // subCancel(area: string, name: string) {
  //   return `${name}(${area}) 구독취소`;
  // }
}
