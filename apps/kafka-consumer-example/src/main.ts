import { NestFactory } from '@nestjs/core';
import { KafkaConsumerExampleModule } from './kafka-consumer-example.module';

async function bootstrap() {
  const app = await NestFactory.create(KafkaConsumerExampleModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
