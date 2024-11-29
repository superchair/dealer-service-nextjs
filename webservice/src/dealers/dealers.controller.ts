import { Body, Controller, Delete, Get, Logger, Param, ParseUUIDPipe, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { DealersService } from './dealers.service';
import { DealerDto } from './dto/dealer.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Auth0 } from '../auth/guard/authentication.guard';
import { Auth0Scopes } from '../auth/decorators/auth0-scopes';

@UseGuards(Auth0)
@Controller({
  path: 'dealers',
  version: '1'
})
@ApiBearerAuth()
export class DealersController {
  private readonly logger: Logger = new Logger(DealersController.name)
  constructor(
    private readonly dealersService: DealersService,
  ) {
  }

  @Get()
  @Auth0Scopes(['dealer-service:read'])
  async getDealers() {
    return await this.dealersService.getDealers()
  }

  @Get('/:dealerId')
  async getDealerById(
    @Param('dealerId', new ParseUUIDPipe) dealerId: string
  ) {
    return await this.dealersService.getDealerById(dealerId)
  }

  @Post()
  async createDealer(
    @Body(new ValidationPipe) newDealer: DealerDto
  ) {
    return await this.dealersService.createDealer(newDealer)
  }

  @Put('/:dealerId')
  async updateDealer(
    @Body(new ValidationPipe) updatedDealer: DealerDto,
    @Param('dealerId', new ParseUUIDPipe) dealerId: string
  ) {
    return await this.dealersService.updateDealer(dealerId, updatedDealer)
  }

  @Delete('/:dealerId')
  async deleteDealer(
    @Param('dealerId', new ParseUUIDPipe) dealerId: string
  ) {
    return await this.dealersService.deleteDealer(dealerId)
  }
}
