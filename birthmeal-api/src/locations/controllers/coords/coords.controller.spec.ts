import { Test, TestingModule } from '@nestjs/testing';
import { CoordsController } from './coords.controller';

describe('CoordsController', () => {
  let controller: CoordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoordsController],
    }).compile();

    controller = module.get<CoordsController>(CoordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
