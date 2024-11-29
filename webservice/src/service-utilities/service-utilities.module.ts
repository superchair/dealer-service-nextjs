import { Module } from '@nestjs/common';
import { HealthzController } from './healthz.controller';
import { InfoController } from './info.controller';
import { InfoService } from './info.service';

@Module({
  controllers: [HealthzController, InfoController],
  providers: [InfoService]
})
export class ServiceUtilitiesModule {}
