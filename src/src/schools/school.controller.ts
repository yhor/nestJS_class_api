import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SchoolService } from './school.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { Roles } from './../decorator/role.decorator';
import { Role } from './../enums/role.enum';
import { ApiBasicAuth, ApiBearerAuth, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';


@ApiTags('school')
@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}
  
  @ApiBasicAuth()
  @ApiOperation({ summary: '학교생성', description: '학교 생성하기' })
  @Post()
  @Roles(Role.Admin)
  create(@Body() createSchoolDto: CreateSchoolDto) {
    return this.schoolService.create(createSchoolDto);
  }
  
  @ApiBearerAuth()
  @ApiOperation({ summary: '학교삭제', description: '학교 삭제' })
  @Delete()
  @Roles(Role.Admin)
  delete(@Body() createSchoolDto: CreateSchoolDto) {
    return this.schoolService.delete(createSchoolDto);
  }

  @ApiOperation({ summary: '학교(뉴스) 모두보기', description: '모든 학교 뉴스리스트 일괄 보기' })
  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.schoolService.findSchools();
  }

  @ApiOperation({ summary: '학교삭제', description: '학교 삭제' })
  @Get('/news')
  @Roles(Role.Admin)
  findOne(@Query() query: CreateSchoolDto) {
    return this.schoolService.findOne(query);
  }

  @ApiOperation({ summary: '뉴스 생성', description: '뉴스 생성하기' })
  @Post('/news')
  @Roles(Role.Admin)
  newsCreate(@Body() createSchoolDto: CreateSchoolDto) {
    return this.schoolService.newsCreate(createSchoolDto);
  }

  @ApiOperation({ summary: '뉴스 수정', description: '뉴스 수정' })
  @Patch('/news/:id')
  @Roles(Role.Admin)
  newsUpdate(@Param('id') id: number, @Body() updateSchoolDto: UpdateSchoolDto) {
    return this.schoolService.newsUpdate(id, updateSchoolDto);
  }
  
  @ApiOperation({ summary: '뉴스 삭제', description: '뉴스 삭제' })
  @Delete('/news/:id')
  @Roles(Role.Admin)
  newDelete(@Param('id') id: number, @Query() query: CreateSchoolDto) {
    return this.schoolService.newDelete(id, query);
  }
}
