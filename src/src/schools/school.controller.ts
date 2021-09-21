import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SchoolService } from './school.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { Roles } from './../decorator/role.decorator';
import { Role } from './../enums/role.enum';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { swaggerSchool, swaggerSchoolNew } from './../swagger/model';

@ApiBearerAuth('access-token')
@ApiTags('school')
@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}
  
  @ApiOperation({ summary: '학교생성', description: '학교 생성하기' })
  @ApiBody({ type: swaggerSchool })
  @Post()
  @Roles(Role.Admin)
  create(@Body() createSchoolDto: CreateSchoolDto) {
    return this.schoolService.create(createSchoolDto);
  }
  
  @ApiOperation({ summary: '학교삭제', description: '학교 삭제' })
  @ApiBody({ type: swaggerSchool })
  @Delete(':name/:area')
  @Roles(Role.Admin)
  delete(
    @Param('name') name: string,
    @Param('area') area: string,
  ) {
    return this.schoolService.delete({ name, area });
  }

  @ApiOperation({ summary: '학교(뉴스) 모두보기', description: '모든 학교 뉴스리스트 일괄 보기' })
  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.schoolService.findSchools();
  }

  @ApiOperation({ summary: '특정 학교(뉴스) 보기 ', description: '특정 학교(뉴스) 보기' })
  @Get('/news')
  @Roles(Role.Admin)
  findOne(@Query() query: swaggerSchool) {
    return this.schoolService.findOne(query);
  }

  @ApiOperation({ summary: '뉴스 생성', description: '뉴스 생성하기' })
  @Post('/news')
  @ApiBody({ type: swaggerSchoolNew })
  @Roles(Role.Admin)
  newsCreate(@Body() createSchoolDto: CreateSchoolDto) {
    return this.schoolService.newsCreate(createSchoolDto);
  }

  @ApiOperation({ summary: '뉴스 수정', description: '뉴스 수정' })
  @Patch('/news/:id')
  @ApiBody({ type: swaggerSchoolNew })
  @Roles(Role.Admin)
  newsUpdate(@Param('id') id: number, @Body() updateSchoolDto: UpdateSchoolDto) {
    return this.schoolService.newsUpdate(id, updateSchoolDto);
  }
  
  @ApiOperation({ summary: '뉴스 삭제', description: '뉴스 삭제' })
  @Delete('/news/:id/:name/:area')
  @Roles(Role.Admin)
  newDelete(
    @Param('id') id: number,
    @Param('name') name: string,
    @Param('area') area: string,
  ) {
    return this.schoolService.newDelete(id, { name, area });
  }
}
