import { Test, TestingModule } from '@nestjs/testing';
import { ValorationService } from './valoration.service';

describe('ValorationService', () => {
  let service: ValorationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValorationService],
    }).compile();

    service = module.get<ValorationService>(ValorationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
