import { NestFactory } from '@nestjs/core'
import { KafkaConsumerExampleModule } from './kafka-consumer-example.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { WinstonModule } from 'nest-winston'
import { loggerFactory } from '@dealer-service/common/logger/winston.logger'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(KafkaConsumerExampleModule,{
    bufferLogs: true,
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'kafka-consumer-example',
        brokers: ['127.0.0.1:29092'],
      },
      consumer: {
        groupId: 'kafka-consumer-example-group',
      }
    }
  })

  const configService = app.get(ConfigService)
  const appName: string = configService.get<string>('APP_NAME')

  const logger = WinstonModule.createLogger({
    instance: loggerFactory({
      applicationName: appName,
      //filePath: `/var/log/${appName}`,
      filePath: `./logs/${appName}`,
      logLevel: configService.get('LOG_LEVEL')
    })
  })
  app.useLogger(logger)

  await app.listen()
}
bootstrap()
