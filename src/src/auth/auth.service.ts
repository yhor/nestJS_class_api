import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import getUser from './../db/users/getUser';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService
  ) {}

  async validateUser(name: string, role: string): Promise<any> {
    console.log('validateUser')
    const user = await getUser({name, role});
    console.log('user', user);
    if (user) {
      const { subs, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { ...user };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}