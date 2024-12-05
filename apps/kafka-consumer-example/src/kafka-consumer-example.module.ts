import { Logger, Module } from '@nestjs/common';
import { KafkaExampleController } from './kafka-example/kafka-example.controller';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/env.validation';
import constConfig from './config/env.const';

// TODO: deal with SASL_SSL
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      validate,
      load: [constConfig]
    })
  ],
  controllers: [KafkaExampleController],
  providers: [Logger]
})
export class KafkaConsumerExampleModule {}
