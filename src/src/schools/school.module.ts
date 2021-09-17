import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { AuthMiddleware } from './../common/middleware/auth.middleware';

@Module({
  controllers: [SchoolController],
  providers: [SchoolService]
})

export class SchoolModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('school')
  }
}

