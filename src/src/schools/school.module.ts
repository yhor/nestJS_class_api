import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { AuthMiddleware } from './../common/middleware/auth.middleware';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './../auth/Roles.guard';

@Module({
  controllers: [SchoolController],
  providers: [
    SchoolService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ]
})

export class SchoolModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('school')
  }
}

