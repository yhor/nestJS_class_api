import { Test, TestingModule } from '@nestjs/testing';
import { GgService } from './gg.service';

describe('GgService', () => {
  let service: GgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GgService],
    }).compile();

    service = module.get<GgService>(GgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
