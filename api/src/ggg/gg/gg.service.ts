import { Injectable } from '@nestjs/common';

@Injectable()
export class GgService {
  get() {
    return 'gg-get';
  }
}
