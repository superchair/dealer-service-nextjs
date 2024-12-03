import { Module } from '@nestjs/common'
import { InfoService } from './services/info.service'
import { HealthzController } from './controllers/healthz.controller'
import { InfoController } from './controllers/info.controller'

@Module({
  controllers: [
    HealthzController,
    InfoController
  ],
  providers: [InfoService],
  exports: [],
})
export class ServiceUtilitiesModule {}
