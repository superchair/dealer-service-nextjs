import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

@Catch(UnauthorizedException, ForbiddenException)
export class AuthExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AuthExceptionFilter.name);

  constructor(
  ) {}

  catch(exception: UnauthorizedException|ForbiddenException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const status = exception.getStatus();

    this.logger.warn(`Exception: ${exception.message}, status: ${status}`);

    const httpStatus: number = exception instanceof ForbiddenException ? 403 : 401

    const responseBody = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: exception.message,
    }

    ctx.getResponse().status(httpStatus).json(responseBody);
  }
}
