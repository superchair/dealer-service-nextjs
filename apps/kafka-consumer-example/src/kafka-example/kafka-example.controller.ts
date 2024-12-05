import { BadRequestException, Controller, Logger, ValidationPipe } from '@nestjs/common';
import { Ctx, EventPattern, KafkaContext, Payload } from '@nestjs/microservices';
import { IsNumber, IsString } from 'class-validator';

class Dto {
  @IsString()
  name: string

  @IsNumber()
  date: string
}

class KafkaValidationPipe extends ValidationPipe {
  private readonly logger: Logger = new Logger(KafkaValidationPipe.name)
  async transform(value: any, metadata: any) {
    try {
      return await super.transform(value, metadata);
    } catch (error) {
      if (error instanceof BadRequestException) {
        // Log the validation error or take custom action
        this.logger.warn('Validation error:', error.message);
        return null; // Return null or a default value instead of throwing
      }
      throw error; // Re-throw non-validation errors
    }
  }
}

@Controller('kafka-example')
export class KafkaExampleController {
  private readonly logger: Logger = new Logger(KafkaExampleController.name)

  @EventPattern('example-topic')
  async handleExample(
    @Payload(KafkaValidationPipe) data: Dto,
    @Ctx() context: KafkaContext
  ) {
    const payload = JSON.stringify(data)
    this.logger.log(payload)
    const rawMessage = context.getMessage().value
    const str = JSON.stringify(rawMessage, null, 2)
    this.logger.log(`Message Received: ${str}`)
  }
}
