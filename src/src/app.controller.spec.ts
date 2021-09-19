import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { SchoolModule } from './schools/school.module';
import { UsersModule } from './users/users.module';

describe('AppsController', () => {
  let controller: AppController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        SchoolModule,
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
          ignoreEnvFile: process.env.NODE_ENV === 'prod', // prod할 때는 heroku에 따로 넣기로
        }),
        UsersModule,
        AuthModule,
      ],
      controllers: [AppController],
      providers: [
        {
          provide: APP_GUARD,
          useClass: JwtAuthGuard,
        },
      ],
    }).compile();

    controller = module.get<AppController>(AppController);
  });

  describe('root', () => {
    it('login', async () => {
      const result = await controller.login(
        {
          body: {
            name: "승열",
            role: "관리자"
          }
        }
      );
      expect(result).toHaveProperty('access_token');
    });
  });
});
