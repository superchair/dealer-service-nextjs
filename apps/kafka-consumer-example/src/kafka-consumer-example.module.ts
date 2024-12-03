import { Module } from '@nestjs/common';
import { KafkaConsumerExampleController } from './kafka-consumer-example.controller';
import { KafkaConsumerExampleService } from './kafka-consumer-example.service';

@Module({
  imports: [],
  controllers: [KafkaConsumerExampleController],
  providers: [KafkaConsumerExampleService],
})
export class KafkaConsumerExampleModule {}
