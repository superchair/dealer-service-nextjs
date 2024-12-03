import { Logger, Module } from '@nestjs/common';
import { DealersModule } from './dealers/dealers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dealer } from './dealers/entity/dealer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from './config/env.validation';
import constConfig from './config/env.const';
import { ServiceUtilitiesModule } from '@platform/service-utilities';
import { AuthenticationModule } from '@dealer-service/authentication';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      validate,
      load: [constConfig]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          schema: configService.get<string>('DB_SCHEMA'),
          entities: [
            Dealer
          ],
          synchronize: configService.get<boolean>('DB_SYNCHRONIZE') ?? false,
          logging: configService.get<boolean>('DB_LOGGING') ?? false
        }
      }
    }),
    AuthenticationModule,
    DealersModule,
    ServiceUtilitiesModule
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
