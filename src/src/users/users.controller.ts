import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateSubDto, CreateUserDto } from './dto/create-user.dto';
import { AuthPublic } from './../decorator/authPubilc.decorator';
import { Roles } from './../decorator/role.decorator';
import { Role } from './../enums/role.enum';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { swaggerSchool, swaggerUser } from 'src/swagger/model';


@ApiBearerAuth('access-token')
@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //유저 리스트
  @ApiOperation({ summary: '유저 리스트', description: '모든 유저리스트 반환' })
  @Get()
  @Roles(Role.Admin)
  userList() {
    return this.usersService.userList();
  }

  //유저생성
  @ApiOperation({ summary: '유저생성', description: '학생 관리자 생성' })
  @ApiBody({ type: swaggerUser})
  // @ApiBearerAuth()
  @AuthPublic()
  @Post()
  userCreate(@Body() createUserDto: CreateUserDto) {
    return this.usersService.userCreate(createUserDto);
  }

  //유저 삭제
  @ApiOperation({ summary: '유저삭제', description: '유저를 삭제한다' })
  @Delete(':name/:role')
  @Roles(Role.Admin)
  userDelete(
    @Param('name') name: string,
    @Param('role') role: string
  ) {
    return this.usersService.userDelete({ name, role });
  }

  //학생은 학교 페이지를 구독할 수 있다.
  @ApiOperation({ summary: '학교구독', description: '학교 구독한다.' })
  @Post('/sub')
  @ApiBody({ type: swaggerSchool })
  @Roles(Role.User)
  subCreate(
    @Request() req,
    @Body() createSubDto: CreateSubDto
  ) {
    const data = { ...req.user, subs: createSubDto }
    return this.usersService.subCreate(data);
  }

  //학생은 구독 중인 학교 페이지를 구독 취소할 수 있다.
  @ApiOperation({ summary: '구독취소', description: '유저가 학교 구독 취소' })
  @Patch('/sub')
  @ApiBody({ type: swaggerSchool })
  @Roles(Role.User)
  subCancel(
    @Request() req,
    @Body() createUserDto: CreateSubDto
  ) {
    const data = { ...req.user, subs: createUserDto }
    return this.usersService.subCancel(data);
  }

  //학생은 구독 중인 학교 페이지 목록을 확인할 수 있다
  @ApiOperation({ summary: 'My 구독리스트', description: '내 구독 목록 보기' })
  @Get('/sub/list')
  @Roles(Role.User)
  subList(
    @Request() req
  ) {
    return this.usersService.subList(req.user);
  }

  //학생은 구독 중인 학교 페이지별 소식을 볼 수 있다. 학교별 소식은 최신순으로 노출해야 함
  @ApiOperation({ summary: '학교별 뉴스 보기', description: '학교 별 뉴스 보기' })
  @Get('/sub/:name/:area')
  @Roles(Role.User)
  subDetail(
    @Request() req,
    @Param('name') name: string, 
    @Param('area') area: string,
  ) {
    return this.usersService.subDetail(name, area, req.user);
  }

  //추가구현
  @ApiOperation({ summary: '내가 구독한 모든 정보 한번에 보기', description: '구독했던 모든 피드 보기' })
  @Get('/sub/all')
  @Roles(Role.User)
  subAll(
    @Request() req
  ) {
    return this.usersService.subAll(req.user);
  }
}
