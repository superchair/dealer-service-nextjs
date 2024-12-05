import { Test, TestingModule } from '@nestjs/testing';
import { KafkaExampleService } from './kafka-example.service';

describe('KafkaExampleService', () => {
  let service: KafkaExampleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KafkaExampleService],
    }).compile();

    service = module.get<KafkaExampleService>(KafkaExampleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
