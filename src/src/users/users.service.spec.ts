import { NotFoundException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { SchoolService } from './../schools/school.service';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let userService: UsersService;
  let schoolService: SchoolService;
  const user = {
    name: "승열",
    role: "학생",
  }
  const admin = {
    name: "교육부",
    role: "관리자",
  }

  const school = {
    name: "nest학교",
    area: "서울",
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

    // console.log(process.env)
    userService = module.get<UsersService>(UsersService);
    schoolService = module.get<SchoolService>(SchoolService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(schoolService).toBeDefined();
  });

  describe('userList', () => {
    it('유저 리스트', async () => {
      const result = await userService.userList();
      expect(result).toBeInstanceOf(Array);
    });
  });

  async function createUser(user) {
    try {
      const result = await userService.userCreate(user);
      expect(result).toEqual(`${user.name}(${user.role}) 가 등록되었습니다`);
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);  
    }
  }
  async function deleteUser(user) {
    try {
      const result = await userService.userDelete(user);
      expect(result).toEqual(`${user.name}(${user.role}) 가 삭제되었습니다`);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException)
    }
  }

  async function createSchool(school) {
    try {
      const result = await schoolService.create(school);
      expect(result).toEqual(`${school.name}(${school.area})학교가 등록되었습니다`);
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);  
    }
  }

  async function deleteSchool(school) {
    try {
      const result = await schoolService.delete(school);
      expect(result).toEqual(`${school.name}(${school.area})학교가 삭제되었습니다`);
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);  
    }
  }

  describe('userCreate', () => {
    it('유저(학생) 등록', async () => await createUser(user));
    it('유저(관리자) 등록', async () => await createUser(admin));
    it('유저(학생) 중복 등록', async () => await createUser(user));
    it('유저(관리자) 중복 등록', async () => await createUser(admin));
  });

  describe('userDelete', () => {
    it('유저(학생) 삭제', async () => await deleteUser(user));
    it('유저(관리자) 삭제', async () => await deleteUser(admin));
    it('유저(학생) 중복 삭제', async () => await deleteUser(user));
    it('유저(관리자) 중복 삭제', async () => await deleteUser(admin));
  });

  
  describe('구독 시스템', () => {
    it('유저(학생) 등록', async () => await createUser(user));
    it('학교 생성', async () => await createSchool(school));
    it('subCreate - 학교 구독', async () => {
      const dummyUser = { ...user };
      dummyUser['subs'] = school;

      const result = await userService.subCreate(dummyUser);
      expect(result).toEqual(`${user.name} ${school.name}(${school.area}) 구독 성공`);
    });
    it('subList - 구독목록', async () => {
      const result = await userService.subList({ ...user });
      expect(result).toEqual([`${school.name}(${school.area})`]);
    });
    it('subCancel - 구독취소', async () => {
      const dummyUser = { ...user };
      dummyUser['subs'] = school;
      const result = await userService.subCancel(dummyUser);
      expect(result).toEqual(`${user.name} ${school.name}(${school.area}) 구독취소`);
    });
    it('subList - 구독목록', async () => {
      const result = await userService.subList({ ...user });
      expect(result).toEqual(`구독중인 학교가 없습니다`);
    });
  
    it('subDetail - 학생 학교/지역 별 뉴스보기', async () => {
      const result = await userService.subDetail(school.name, school.area, user, false);
      expect(result).toEqual([]);
    });

    it('subAll - 추가구현 학생 총 피드 보기?', async () => {
      const result = await userService.subAll(user);
      expect(result).toEqual([]);
    });

    it('유저(학생) 삭제', async () => await deleteUser(user));
    it('학교 삭제', async () => await deleteSchool(school));
  });
});
 