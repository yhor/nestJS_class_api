import { Controller, Get, NotFoundException, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthPublic } from './decorator/authPubilc.decorator';
import getUser from './db/users/getUser';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { swaggerLoginInfo } from './swagger/model';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: '로그인', description: 'access_token 발급' })
  @ApiBody({ type: swaggerLoginInfo })
  @ApiTags('login')
  @AuthPublic()
  @Post('login')
  async login(@Request() req) {
    const { name, role } = req.body;
    if (!name && !role) {
      throw new NotFoundException('필드를 확인해주세요');
    }
    await getUser({ name, role });
    return this.authService.login({ name, role });
  }
}
