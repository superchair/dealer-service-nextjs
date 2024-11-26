import { ConfigService } from "@nestjs/config"
import { Dealer } from "../dealers/entity/dealer"
import { DataSource } from "typeorm"
import { config } from "dotenv"

config();

const configService = new ConfigService()

export default new DataSource({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  schema: configService.get<string>('DB_SCHEMA'),
  entities: [
    Dealer
  ],
  migrations: [
    'src/db/migrations/*.{js,ts}'
  ]
})