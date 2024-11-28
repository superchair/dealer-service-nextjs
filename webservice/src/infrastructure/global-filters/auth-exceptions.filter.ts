import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { AppEnv } from '../../common/enums/app-env.enum';
import { HttpAdapterHost } from '@nestjs/core';

@Catch(UnauthorizedException, ForbiddenException)
export class AuthExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AuthExceptionFilter.name);

  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly configService: ConfigService
  ) {}

  catch(exception: UnauthorizedException|ForbiddenException, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const status = exception.getStatus();

    const isProduction = this.configService.get<string>('APP_ENV') === AppEnv.PROD

    this.logger.error(`Exception: ${exception.message}, status: ${status}`);

    const httpStatus: number = exception instanceof ForbiddenException ? 403 : 401

    const responseBody = isProduction ?
      {
        statusCode: status,
        timestamp: new Date().toISOString(),
        message: exception.message,
      } :
      {
        statusCode: status,
        timestamp: new Date().toISOString(),
        message: exception.message,
        stacktrace: exception.stack.split('\n').map((line) => line.trim()),
      }

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
