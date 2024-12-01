import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID, MinLength } from "class-validator";

export class DealerInputDto {
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty()
  name: string
}

export class DealerOutputDto extends PartialType(DealerInputDto) {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  id: string
}