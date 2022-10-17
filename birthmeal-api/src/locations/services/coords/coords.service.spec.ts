import { Test, TestingModule } from '@nestjs/testing';
import { CoordsService } from './coords.service';

describe('CoordsService', () => {
  let service: CoordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoordsService],
    }).compile();

    service = module.get<CoordsService>(CoordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
