import { Injectable } from '@nestjs/common';

@Injectable()
export class KafkaConsumerExampleService {
  getHello(): string {
    return 'Hello World!';
  }
}
