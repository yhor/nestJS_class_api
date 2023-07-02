import { Injectable } from '@nestjs/common';

@Injectable()
export class CbService {
  check() {
    const result = 'check';
    console.log('check', result);
    return result;
  }
}
