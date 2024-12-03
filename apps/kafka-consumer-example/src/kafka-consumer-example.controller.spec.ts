import { Test, TestingModule } from '@nestjs/testing';
import { KafkaConsumerExampleController } from './kafka-consumer-example.controller';
import { KafkaConsumerExampleService } from './kafka-consumer-example.service';

describe('KafkaConsumerExampleController', () => {
  let kafkaConsumerExampleController: KafkaConsumerExampleController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [KafkaConsumerExampleController],
      providers: [KafkaConsumerExampleService],
    }).compile();

    kafkaConsumerExampleController = app.get<KafkaConsumerExampleController>(KafkaConsumerExampleController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(kafkaConsumerExampleController.getHello()).toBe('Hello World!');
    });
  });
});
