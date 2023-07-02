import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SchoolModule } from './schools/school.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { CbModule } from './modules/mbi-solution/cb/cb.module';
import { GgService } from './ggg/gg/gg.service';
import { CbService } from './modules/mbi-solution/cb/cb.service';

@Module({
  imports: [
    SchoolModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod', // prod할 때는 heroku에 따로 넣기로
    }),
    UsersModule,
    AuthModule,
    CbModule,
  ],
  controllers: [AppController],
  providers: [
    {
      //jwt-auth 가드 전역
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
