import { Controller, Get } from '@nestjs/common';
import { KafkaConsumerExampleService } from './kafka-consumer-example.service';

@Controller()
export class KafkaConsumerExampleController {
  constructor(private readonly kafkaConsumerExampleService: KafkaConsumerExampleService) {}

  @Get()
  getHello(): string {
    return this.kafkaConsumerExampleService.getHello();
  }
}
