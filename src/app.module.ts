import { Module } from '@nestjs/common';
import { DealersModule } from './dealers/dealers.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Dealer } from './dealers/entity/dealer';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'database',
  port: 5432,
  username: 'postgres',
  password: 'passwd',
  database: 'postgres',
  schema: 'dealer_service',
  entities: [
    Dealer
  ],
  synchronize: true,
  logging: true
}

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    DealersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
