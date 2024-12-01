import { ApiProperty } from "@nestjs/swagger";
import { IsISO8601, IsNotEmpty, IsNumber, MinLength } from "class-validator";

export default class StdErrResponseDto {
  @ApiProperty()
  @IsNumber()
  statusCode: number

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3)
  message: string

  @ApiProperty()
  @IsNotEmpty()
  @IsISO8601()
  timestamp: string
}