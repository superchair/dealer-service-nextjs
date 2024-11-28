import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './infrastructure/global-filters/http-excpetion.filter';
import { AllExceptionsFilter } from './infrastructure/global-filters/all-exceptions.filter';
import { AuthExceptionFilter } from './infrastructure/global-filters/auth-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  app.useGlobalFilters(
    new AllExceptionsFilter(httpAdapterHost, configService),
    new HttpExceptionFilter(configService),
    new AuthExceptionFilter(httpAdapterHost, configService),
  )

  // start app
  await app.listen(port);

  console.log(`Application is running on: ${port}`);
}

// begin app bootstrap
bootstrap();
