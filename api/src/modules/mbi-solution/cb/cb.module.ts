import { Module } from '@nestjs/common';
import { CbService } from './cb.service';
import { CbController } from './cb.controller';
import { GgService } from 'src/ggg/gg/gg.service';

@Module({
  controllers: [CbController],
  providers: [CbService, GgService],
})
export class CbModule {}
