import { NotFoundException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './../users/users.service';
import { SchoolService } from './school.service';

describe('SchoolService', () => {
  let userService: UsersService;
  let schoolService: SchoolService;
  const school = {
    area: "서울",
    name: "nest학교",
  }
  const id = 1;
  const news = {
    subject: "공지사항",
    content: "반갑습니다",
  }

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env.test'
        }),
      ],
      providers: [UsersService, SchoolService],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    schoolService = module.get<SchoolService>(SchoolService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(schoolService).toBeDefined();
  });

  async function createSchool(s) {
    try {
      const result = await schoolService.create(s);
      expect(result).toEqual(`${s.name}(${s.area})학교가 등록되었습니다`);
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);  
    }
  }

  async function deleteSchool(s) {
    try {
      const result = await schoolService.delete(school);
      expect(result).toEqual(`${s.name}(${s.area})학교가 삭제되었습니다`);
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);  
    }
  }

  describe('userList', () => {
    const test = [
      { area: '서울', name: '가학교'},
      { area: '서울', name: '나학교'},
      { area: '서울', name: '다학교'},
    ]
    it('가학교 생성', async () => await createSchool(test[0]));
    it('나학교 생성', async () => await createSchool(test[1]));
    it('다학교 생성', async () => await createSchool(test[2]));
    it('학교 리스트', async () => {
      const result = await schoolService.findSchools();
      expect(result.length > 0).toEqual(true);
      expect(result.length > 0).toEqual(true);
      expect(result.length > 0).toEqual(true);
    });
    it('가학교 삭제', async () => await deleteSchool(test[0]));
    it('나학교 삭제', async () => await deleteSchool(test[1]));
    it('다학교 삭제', async () => await deleteSchool(test[2]));
  });


  describe('create', () => {
    it('학교 생성', async () => await createSchool(school));
  });

  describe('delete', () => {
    it('학교 삭제', async () => await deleteSchool(school));
  });

  describe('newsCreate', () => {
    it('학교 생성', async () => await createSchool(school));
    it('뉴스 생성', async () => { 
      const dummySchool = { ...school };
      dummySchool['news'] = news;
      const result = await schoolService.newsCreate(dummySchool);
      expect(result).toEqual(`${school.name}(${school.area})의 ${id}번 뉴스가 등록되었습니다`);
    });
    it('뉴스 업데이트', async () => { 
      const dummySchool = { ...school };
      dummySchool['news'] = news;
      const result = await schoolService.newsUpdate(id, dummySchool);
      expect(result).toEqual(`${school.name}(${school.area})의 ${id}번 뉴스가 수정되었습니다`);
    });
    it('뉴스 삭제', async () => { 
      const dummySchool = { ...school };
      dummySchool['news'] = news;
      const result = await schoolService.newDelete(id, dummySchool);
      expect(result).toEqual(`${school.name}(${school.area})의 ${id}번 뉴스가 삭제되었습니다`);
    });
    it('학교 삭제', async () => await deleteSchool(school));
  });
});
