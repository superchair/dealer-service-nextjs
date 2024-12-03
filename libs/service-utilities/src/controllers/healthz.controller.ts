import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@Controller({
  path: 'healthz',
  version: VERSION_NEUTRAL
})
@ApiTags('Service Utilities')
export class HealthzController {
  @Get()
  async getHealthz() {
    return {
      status: "ok"
    }
  }
}
