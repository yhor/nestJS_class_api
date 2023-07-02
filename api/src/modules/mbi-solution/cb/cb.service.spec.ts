import { Test, TestingModule } from '@nestjs/testing';
import { CbService } from './cb.service';

describe('CbService', () => {
  let service: CbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CbService],
    }).compile();

    service = module.get<CbService>(CbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
