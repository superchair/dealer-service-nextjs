import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './infrastructure/global-filters/http-exception.filter';
import { AllExceptionsFilter } from './infrastructure/global-filters/all-exceptions.filter';
import { AuthExceptionFilter } from './infrastructure/global-filters/auth-exception.filter';
import { VersioningType } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { loggerFactory } from './infrastructure/logger/winston.logger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  });

  app.use(helmet())

  // swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Dealer Service')
    .setDescription('A service that provides information about car dealers')
    .setVersion('1.0')
    .addTag('Service Utilities')
    .addBearerAuth({
      type: "apiKey",
      in: "header",
      name: "Authorization",
      scheme: "bearer",
      description: "Enter your bearer token in the format 'Bearer <token>'"
    })
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);

  const configService = app.get(ConfigService)
  const httpAdapterHost = app.get(HttpAdapterHost);
  const port = configService.get<number>('APP_PORT')

  // use winston for logging
  const appName: string = configService.get<string>('APP_NAME')
  const logger = WinstonModule.createLogger({
    instance: loggerFactory({
      applicationName: appName,
      filePath: `/var/log/${appName}`,
      logLevel: configService.get('LOG_LEVEL')
    })
  })
  app.useLogger(logger)

  // exception handles are added in reverse order
  app.useGlobalFilters(
    new AllExceptionsFilter(httpAdapterHost, configService),
    new HttpExceptionFilter(configService),
    new AuthExceptionFilter(),
  )

  app.enableVersioning({
    type: VersioningType.URI,
  });

  // start app
  await app.listen(port);

  logger.log(`Application is running on: ${port}`);
}

// begin app bootstrap
bootstrap()