import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SchoolModule } from './schools/school.module';

@Module({
  imports: [SchoolModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}