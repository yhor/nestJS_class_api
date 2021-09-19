import { Injectable, NotFoundException } from '@nestjs/common';
import getSchool from './../db/schools/getSchool';
import { School } from './../schools/entities/school.entity';
import delUser from './../db/users/delUsers';
import getUser from './../db/users/getUser';
import getUsers from './../db/users/getUsers';
import putUser from './../db/users/putUsers';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Role } from './../enums/role.enum';

@Injectable()
export class UsersService {
  /**
   * 유저목록
   * @returns 
   */
  userList() {
    return getUsers();
  }

  /**
   * 유저생성
   * @param createUserDto 
   * @returns 
   */
  async userCreate(createUserDto: CreateUserDto) {
    const role = createUserDto.role;
    let roleCheck = false;
    for(const key in Role) {
      if (!Role[key].includes(role)) continue;
      roleCheck = true;
      break;
    };
    if (!roleCheck) throw new NotFoundException('잘못된 권한입니다');
    
    await getUser(createUserDto, false);
    await putUser(createUserDto);

    return `${createUserDto.name}(${createUserDto.role}) 가 등록되었습니다`;
  }

  /**
   * 유저삭제
   * @param createUserDto 
   * @returns 
   */
  async userDelete(createUserDto: CreateUserDto) {
    await getUser(createUserDto);
    await delUser(createUserDto);

    return `${createUserDto.name}(${createUserDto.role}) 가 삭제되었습니다`;
  }
  
  /**
   * 학교 구독
   * @param createUserDto 
   * @returns 
   */
  async subCreate(createUserDto: CreateUserDto) {
    const user = await getUser(createUserDto, true);
    const schoolInfo: School = {
      area: createUserDto.subs['area'],
      name:createUserDto.subs['name']
    }
    await getSchool(schoolInfo);

    user.subs = user.subs || [];
    user.subs.forEach((sub) => {
      if (sub.area === schoolInfo.area 
        && sub.name === schoolInfo.name
        && sub.is_sub === 'Y') {
        throw new NotFoundException('이미구독중입니다');
      }
    })
    user.subs.push({
      ...schoolInfo,
	    sub_start_date: new Date(),
      is_sub: 'Y'
    });

    await putUser(user);

    return `${createUserDto.name} ${schoolInfo.name}(${schoolInfo.area}) 구독 성공`;
  }

  /**
   * 구독취소
   * @param createUserDto 
   * @returns 
   */
  async subCancel(createUserDto: CreateUserDto) {
    const user = await getUser(createUserDto, true);
    const schoolInfo: School = {
      area: createUserDto.subs['area'],
      name:createUserDto.subs['name']
    }
    await getSchool(schoolInfo);

    user.subs = user.subs || [];

    user.subs = user.subs.map((sub) => {
      if (sub.area === schoolInfo.area 
        && sub.name === schoolInfo.name
        && sub.is_sub === 'Y') {
          sub.is_sub = 'N';
          sub.sub_end_date = new Date();
      }
      return sub;
    })

    await putUser(user);

    return `${createUserDto.name} ${schoolInfo.name}(${schoolInfo.area}) 구독취소`;
  }

  /**
   * 구독목록
   * @param createUserDto 
   * @returns 
   */
  async subList(createUserDto: CreateUserDto) {
    const user = await getUser(createUserDto, true);
    
    if (!user.subs) return '구독중인 학교가 없습니다';

    const subs = user.subs
      .filter((sub) => sub.is_sub === 'Y')
      .map((obj) => `${obj.name}(${obj.area})`);

    return subs.length ? subs : '구독중인 학교가 없습니다';
  }

  /**
   * 학생 학교/지역 별 뉴스보기
   * @param name 
   * @param area 
   * @param createUserDto 
   * @returns 
   */
  async subDetail(name, area, createUserDto: CreateUserDto, schoolInfo: boolean = false) {
    const user = await getUser(createUserDto, true);
    const school = await getSchool({name, area});
    
    if (!school.news) return [];

    return this.getNewsList(name, area, user, school, schoolInfo);
  }

  /**
   * 추가구현 학생 총 피드 보기?
   * @param createUserDto 
   * @returns 
   */
  async subAll(createUserDto: CreateUserDto) {
    const user = await getUser(createUserDto, true);

    if (!user.subs) return '구독중인 학교가 없습니다.';

    let schoolsList = [];
    
    user.subs.forEach((sub) => {
      const key = `${sub.area}|${sub.name}`;
      if (schoolsList.includes(key)) return;
      schoolsList.push(key);
    });
    
    const schools = await Promise.all(schoolsList.map((key) => {
      return new Promise(resolve => {
        const [ area, name ] = key.split('|');
        resolve(this.subDetail(name, area, createUserDto, true));
      })
    }));

    const newList = [];
    schools.forEach((x)=> {
      if (!Array.isArray(x)) return;
      x.forEach((news) => {
        newList.push(news);
      });
    });

    newList.sort((a, b) => {
      if(a.reg_date == b.reg_date){ return 0} return a.reg_date < b.reg_date ? 1 : -1;
    });

    return newList;
  }

  /**
   * 학교/지역 뉴스 받기
   * @param name 
   * @param area 
   * @param user 
   * @param school 
   */
  getNewsList (name: string, area: string, user: User, school: School, schoolInfo: boolean) {
    const news = [];
    
    let lastSubStartDate;
    
    const subList = user.subs.filter((sub) => {
      if (sub.name === name && sub.area === area) {
        if (sub.is_sub !=='Y') return true;
        lastSubStartDate = sub.sub_start_date;
        return true;
      }
    });

    for (let i = school.news.length - 1; i >= 0; i--) {
      if (school.news[i].is_delete === 'Y') continue;

      const { reg_date } = school.news[i];

      if (lastSubStartDate && reg_date > lastSubStartDate) {
        pushcall(school.news[i]);
        continue;
      }
      
      subList.forEach((sub) => {
        if ( sub.sub_start_date <= reg_date && reg_date <= sub.sub_end_date) {
          pushcall(school.news[i]);
        }
      });
    }

    return news;

    function pushcall(obj) {
      const result = {
        id: obj.id, 
        subject: obj.subject, 
        content: obj.content, 
        reg_date: obj.reg_date 
      }
      if (schoolInfo) {
        result['name'] = name
        result['area'] = area
      } 
      news.push(result);
    }
  }
}
