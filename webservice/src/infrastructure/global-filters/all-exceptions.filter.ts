import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost } from '@nestjs/core';
import { AppEnv } from '../../common/enums/app-env.enum';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly configService: ConfigService
  ) {}

  catch(exception: any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    this.logger.error(
      `Exception: ${exception.message}, stack: ${exception.stack}`,
    );

    const isProduction = this.configService.get<string>('APP_ENV') === AppEnv.PROD

    const responseBody = isProduction ?
      {
        status: httpStatus,
        message: 'Internal Server error',
      } :
      {
        status: httpStatus,
        message: 'Internal Server error',
        stacktrace: exception.stack.split('\n').map((line) => line.trim()),
      };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}