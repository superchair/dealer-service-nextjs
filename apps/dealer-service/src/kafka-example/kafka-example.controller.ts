import { Controller, Get } from '@nestjs/common';
import { KafkaExampleService } from './kafka-example.service';

@Controller({
  path: 'kafka-example',
  version: '1',
})
export class KafkaExampleController {
  constructor(
    private readonly kafkaExampleService: KafkaExampleService
  ) {}

  @Get()
  dispatchMessage() {
    this.kafkaExampleService.dispatchMessage('John Doe');
  }
}
