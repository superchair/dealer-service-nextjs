import { Module } from '@nestjs/common'
import { KafkaExampleController } from './kafka-example.controller'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { KafkaExampleService } from './kafka-example.service'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EXAMPLE_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'kafka-consumer-example',
            brokers: ['127.0.0.1:29092'],
          }
        }
      }
    ]),
  ],
  controllers: [
    KafkaExampleController
  ],
  providers: [
    KafkaExampleService
  ]
})
export class KafkaExampleModule {}
