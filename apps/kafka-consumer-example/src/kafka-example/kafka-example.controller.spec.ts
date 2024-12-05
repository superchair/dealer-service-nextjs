import { Test, TestingModule } from '@nestjs/testing';
import { KafkaExampleController } from './kafka-example.controller';

describe('KafkaExampleController', () => {
  let controller: KafkaExampleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KafkaExampleController],
    }).compile();

    controller = module.get<KafkaExampleController>(KafkaExampleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
