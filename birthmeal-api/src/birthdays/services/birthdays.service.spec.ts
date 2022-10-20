import { Test, TestingModule } from '@nestjs/testing';
import { BirthdaysService } from './birthdays.service';

describe('BirthdaysService', () => {
  let service: BirthdaysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BirthdaysService],
    }).compile();

    service = module.get<BirthdaysService>(BirthdaysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
