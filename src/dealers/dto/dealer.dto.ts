import { ApiProperty } from "@nestjs/swagger";

export class DealerDto {
  @ApiProperty()
  name: string
}