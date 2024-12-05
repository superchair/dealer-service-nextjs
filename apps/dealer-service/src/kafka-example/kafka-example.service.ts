import { Inject, Injectable, Logger } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'

@Injectable()
export class KafkaExampleService {
  private readonly logger = new Logger(KafkaExampleService.name)
  constructor(
    @Inject('EXAMPLE_SERVICE') private readonly exampleKafkaClient: ClientKafka
  ) {}

  async onModuleInit() {
    // avoid warn messages from the kafka client
    this.exampleKafkaClient.connect()
  }

  dispatchMessage(name: string) {
    const message = {
      name,
      date: new Date().toISOString()
    }
    const value = JSON.stringify(message)

    this.logger.log(`Dispatching message to example-topic: ${value}`)
    this.exampleKafkaClient.emit('example-topic', {
      headers: {
        'test': 'test'
      },
      key: 'test',
      value
    })
  }
}
