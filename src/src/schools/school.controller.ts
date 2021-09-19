import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SchoolService } from './school.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { Roles } from './../decorator/role.decorator';
import { Role } from './../enums/role.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiBearerAuth('JWT')
@ApiTags('school')
@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}
  
  @Post()
  @Roles(Role.Admin)
  create(@Body() createSchoolDto: CreateSchoolDto) {
    return this.schoolService.create(createSchoolDto);
  }
  
  @Delete()
  @Roles(Role.Admin)
  delete(@Body() createSchoolDto: CreateSchoolDto) {
    return this.schoolService.delete(createSchoolDto);
  }

  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.schoolService.findSchools();
  }

  @Get('/news')
  @Roles(Role.Admin)
  findOne(@Query() query: CreateSchoolDto) {
    return this.schoolService.findOne(query);
  }

  @Post('/news')
  @Roles(Role.Admin)
  newsCreate(@Body() createSchoolDto: CreateSchoolDto) {
    return this.schoolService.newsCreate(createSchoolDto);
  }

  @Patch('/news/:id')
  @Roles(Role.Admin)
  newsUpdate(@Param('id') id: number, @Body() updateSchoolDto: UpdateSchoolDto) {
    return this.schoolService.newsUpdate(id, updateSchoolDto);
  }
  
  @Delete('/news/:id')
  @Roles(Role.Admin)
  newDelete(@Param('id') id: number, @Query() query: CreateSchoolDto) {
    return this.schoolService.newDelete(id, query);
  }
}
