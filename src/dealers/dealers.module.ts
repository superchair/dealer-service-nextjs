import { Module } from '@nestjs/common';
import { DealersController } from './dealers.controller';
import { DealersService } from './dealers.service';
import { Dealer } from './entity/dealer';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [DealersController],
  providers: [DealersService],
  imports: [
    TypeOrmModule.forFeature([Dealer])
  ]
})
export class DealersModule {}
