import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateSubDto, CreateUserDto } from './dto/create-user.dto';
import { AuthPublic } from './../decorator/authPubilc.decorator';
import { Roles } from './../decorator/role.decorator';
import { Role } from './../enums/role.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiBearerAuth('JWT')
@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //유저 리스트
  @Get()
  @Roles(Role.Admin)
  userList() {
    return this.usersService.userList();
  }

  //유저생성
  
  @ApiBearerAuth('none')
  @AuthPublic()
  @Post()
  userCreate(@Body() createUserDto: CreateUserDto) {
    console.log('createUserDto', createUserDto);
    return this.usersService.userCreate(createUserDto);
  }

  //유저 삭제
  @Delete()
  @Roles(Role.Admin)
  userDelete(@Query() query: CreateUserDto) {
    return this.usersService.userDelete(query);
  }

  //학생은 학교 페이지를 구독할 수 있다.
  @Post('/sub')
  @Roles(Role.User)
  subCreate(
    @Request() req,
    @Body() createUserDto: CreateSubDto
  ) {
    const data = { ...req.user, subs: createUserDto }
    return this.usersService.subCreate(req.user);
  }

  //학생은 구독 중인 학교 페이지를 구독 취소할 수 있다.
  @Patch('/sub')
  @Roles(Role.User)
  subCancel(
    @Request() req,
    @Body() createUserDto: CreateSubDto
  ) {
    const data = { ...req.user, subs: createUserDto }
    return this.usersService.subCancel(data);
  }

  //학생은 구독 중인 학교 페이지 목록을 확인할 수 있다
  @Get('/sub/list')
  @Roles(Role.User)
  subList(
    @Request() req
  ) {
    return this.usersService.subList(req.user);
  }

  //학생은 구독 중인 학교 페이지별 소식을 볼 수 있다. 학교별 소식은 최신순으로 노출해야 함
  @Get('/sub/:schoolname/:schoolarea')
  @Roles(Role.User)
  subDetail(
    @Request() req,
    @Param('schoolname') name: string, 
    @Param('schoolarea') area: string,
  ) {
    return this.usersService.subDetail(name, area, req.user);
  }

  //추가구현
  @Get('/sub/all')
  @Roles(Role.User)
  subAll(
    @Request() req
  ) {
    return this.usersService.subAll(req.user);
  }
}
