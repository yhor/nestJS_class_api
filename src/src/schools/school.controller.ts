import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SchoolService } from './school.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';

@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  //Good
  @Post()
  create(@Body() createSchoolDto: CreateSchoolDto) {
    return this.schoolService.create(createSchoolDto);
  }

  //Good
  @Get()
  findAll() {
    return this.schoolService.findSchools();
  }

  @Get('/news')
  findOne(@Query() query: CreateSchoolDto) {
    return this.schoolService.findOne(query);
  }

  @Post('/news')
  newsCreate(@Body() updateSchoolDto: UpdateSchoolDto) {
    return this.schoolService.newsCreate(updateSchoolDto);
  }

  @Patch('/news/:id')
  newsUpdate(@Param('id') id: number, @Body() updateSchoolDto: UpdateSchoolDto) {
    return this.schoolService.newsUpdate(id, updateSchoolDto);
  }
  
  @Delete('/news/:id')
  newDelete(@Param('id') id: number, @Query() query: CreateSchoolDto) {
    return this.schoolService.newDelete(id, query);
  }
}
