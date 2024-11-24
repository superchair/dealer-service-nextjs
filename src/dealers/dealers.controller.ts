import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { DealersService } from './dealers.service';
import { DealerDto } from './dto/dealer.dto';
import { Auth0 } from 'src/infrastructure/auth/auth0.decorator';
import { Auth0Guard } from 'src/infrastructure/auth/auth0.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('dealers')
@UseGuards(Auth0Guard)
@ApiBearerAuth()
export class DealersController {
  constructor(private readonly dealersService: DealersService) {}

  @Get()
  @Auth0(['dealer-service:read'])
  async getDealers() {
    return await this.dealersService.getDealers()
  }

  @Get('/:dealerId')
  @Auth0()
  async getDealerById(@Param('dealerId') dealerId: string) {
    return await this.dealersService.getDealerById(dealerId)
  }

  @Post()
  @Auth0()
  async createDealer(@Body() newDealer: DealerDto) {
    return await this.dealersService.createDealer(newDealer)
  }

  @Put('/:dealerId')
  @Auth0()
  async updateDealer(@Body() updatedDealer: DealerDto, @Param('dealerId') dealerId: string) {
    return await this.dealersService.updateDealer(dealerId, updatedDealer)
  }

  @Delete('/:dealerId')
  @Auth0()
  async deleteDealer(@Param('dealerId') dealerId: string) {
    return await this.dealersService.deleteDealer(dealerId)
  }
}
