import { Test, TestingModule } from '@nestjs/testing';
import { CbController } from './cb.controller';
import { CbService } from './cb.service';

describe('CbController', () => {
  let controller: CbController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CbController],
      providers: [CbService],
    }).compile();

    controller = module.get<CbController>(CbController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
