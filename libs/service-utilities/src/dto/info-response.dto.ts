import { ApiProperty } from "@nestjs/swagger";

export class InfoResponseDto {
  constructor(
    service: string,
    buildNumber: string,
    buildVersion: string,
    environment: string
  ) {
    this.service = service
    this.build = buildNumber
    this.version = buildVersion
    this.environment = environment
  }
  
  @ApiProperty()
  readonly service: string

  @ApiProperty()
  readonly build: string

  @ApiProperty()
  readonly version: string

  @ApiProperty()
  readonly environment: string
}