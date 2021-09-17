import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getWorld(): string {
    return 'World!World!World!World!World!World!World!World!World!World!World!World!World!';
  }

  getSeoul(): string {
    return '서울입니다';
  }
}
