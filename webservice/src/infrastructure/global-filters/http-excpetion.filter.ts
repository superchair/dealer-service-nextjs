import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { AppEnv } from '../../common/enums/app-env.enum';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  constructor(private readonly configService: ConfigService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const isProduction = this.configService.get<string>('APP_ENV') === AppEnv.PROD

    this.logger.error(`Exception: ${exception.message}, status: ${status}`);

    response.status(status).json(
      isProduction || !exception.stack
        ? {
            statusCode: status,
            timestamp: new Date().toISOString(),
            message: exception.message,
          }
        : {
            statusCode: status,
            timestamp: new Date().toISOString(),
            message: exception.message,
            stacktrace: exception.stack.split('\n').map((line) => line.trim()),
          },
    );
  }
}
