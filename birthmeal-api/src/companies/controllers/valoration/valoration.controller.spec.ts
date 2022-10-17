import { Test, TestingModule } from '@nestjs/testing';
import { ValorationController } from './valoration.controller';

describe('ValorationController', () => {
  let controller: ValorationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ValorationController],
    }).compile();

    controller = module.get<ValorationController>(ValorationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
