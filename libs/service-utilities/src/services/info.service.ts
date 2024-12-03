import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InfoResponseDto } from '../dto/info-response.dto'

@Injectable()
export class InfoService {
  constructor(
    private readonly configService: ConfigService
  ) {}

  async getInfo(): Promise<InfoResponseDto>
  {
    return new InfoResponseDto(
      this.configService.get<string>('APP_NAME'),
      this.configService.get<string>('BUILD_NUMBER') ?? 'unknown',
      this.configService.get<string>('BUILD_VERSION') ?? 'unknown',
      this.configService.get<string>('APP_ENV')
    )
  }
}
