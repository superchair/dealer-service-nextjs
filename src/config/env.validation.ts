import { plainToInstance } from "class-transformer"
import { IsNotEmpty, IsNumber, IsString, validateSync } from "class-validator"

class EnvironmentVariables {
  @IsNotEmpty()
  @IsString()
  APP_ENV: string

  @IsNotEmpty()
  @IsNumber()
  APP_PORT: number

  @IsNotEmpty()
  @IsString()
  APP_BASE_URL: string

  @IsNotEmpty()
  @IsString()
  DB_HOST: string

  @IsNotEmpty()
  @IsNumber()
  DB_PORT: number

  @IsNotEmpty()
  @IsString()
  DB_DATABASE: string

  @IsNotEmpty()
  @IsString()
  DB_SCHEMA: string

  @IsNotEmpty()
  @IsString()
  DB_USERNAME: string

  @IsNotEmpty()
  @IsString()
  DB_PASSWORD: string

  DB_LOGGING: boolean = false
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true
  })

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false
  })

  if (errors.length > 0) {
    throw new Error(errors.toString())
  }

  return validatedConfig
}