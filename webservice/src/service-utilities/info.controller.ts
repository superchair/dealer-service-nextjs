import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { InfoService } from './info.service';
import { InfoResponseDto } from './dto/info-response.dto';

@Controller({
  path: 'info',
  version: VERSION_NEUTRAL
})
@ApiTags('Service Utilities')
export class InfoController {
  constructor(
    private readonly infoService: InfoService
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns information about the service',
    type: InfoResponseDto
  })
  async getInfo(): Promise<InfoResponseDto> {
    return await this.infoService.getInfo();
  }
}
