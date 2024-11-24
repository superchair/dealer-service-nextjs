import { Test, TestingModule } from '@nestjs/testing';
import { DealersController } from './dealers.controller';

describe('DealersController', () => {
  let controller: DealersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DealersController],
    }).compile();

    controller = module.get<DealersController>(DealersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
