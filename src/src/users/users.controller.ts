import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateSchoolDto } from 'src/schools/dto/update-school.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //유저 리스트
  @Get()
  userList() {
    return this.usersService.userList();
  }

  //유저 가입
  @Post()
  userCreate(@Body() createUserDto: CreateUserDto) {
    return this.usersService.userCreate(createUserDto);
  }

  //유저 삭제
  @Delete()
  userDelete(@Query() query: CreateUserDto) {
    return this.usersService.userDelete(query);
  }

  //학생은 구독중인 학교 페이지 목록을 확인할 수 있다.
  @Get('/sub/list')
  subList(@Query() query: CreateUserDto) {
    return this.usersService.subList(query);
  }

  @Get('/sub/:schoolname/:schoolarea')
  subDetail(@Param('schoolname') name: string, @Param('schoolarea') area: string, @Query() query: CreateUserDto) {
    return this.usersService.subDetail(name, area, query);
  }

  @Post('/sub')
  subCreate(@Body() createUserDto: CreateUserDto) {
    return this.usersService.subCreate(createUserDto);
  }

  @Patch('/sub')
  subCancel(@Body() createUserDto: CreateUserDto) {
    return this.usersService.subCancel(createUserDto);
  }

}
