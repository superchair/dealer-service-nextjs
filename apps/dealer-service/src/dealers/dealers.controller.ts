import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { DealersService } from './dealers.service';
import { DealerInputDto, DealerOutputDto } from './dto/dealer.dto';
import StdErrResponseDto from '@dealer-service/common/dto/stderr.response.dto';
import { Auth0 } from '@dealer-service/authentication/guard/authentication.guard';
import { Auth0Scopes } from '@dealer-service/authentication/decorators/auth0-scopes';

@UseGuards(Auth0)
@ApiUnauthorizedResponse({
  description: 'Unauthorized',
  type: StdErrResponseDto
})
@ApiForbiddenResponse({
  description: 'Forbidden',
  type: StdErrResponseDto
})
@ApiInternalServerErrorResponse({
  type: StdErrResponseDto
})
@Controller({
  path: 'dealers',
  version: '1'
})
@ApiBearerAuth()
export class DealersController {
  constructor(
    private readonly dealersService: DealersService
  ) {
  }

  @Get()
  @ApiOkResponse({
    type: DealerOutputDto,
    isArray: true
  })
  @ApiNotFoundResponse({
    description: 'No dealers found'
  })
  @Auth0Scopes(['dealer-service:read'])
  async getDealers(): Promise<Array<DealerOutputDto>> {
    return await this.dealersService.getDealers()
  }

  @Get('/:dealerId')
  @ApiOkResponse({
    type: DealerOutputDto,
    description: 'The dealer with the specified ID'
  })
  @ApiNotFoundResponse({
    description: 'No dealer found'
  })
  async getDealerById(
    @Param('dealerId', new ParseUUIDPipe) dealerId: string
  ) {
    return await this.dealersService.getDealerById(dealerId)
  }

  @Post()
  @ApiCreatedResponse({
    type: DealerOutputDto
  })
  async createDealer(
    @Body(new ValidationPipe) newDealer: DealerInputDto 
  ) {
    return await this.dealersService.createDealer(newDealer)
  }

  @Put('/:dealerId')
  @ApiOkResponse({
    type: DealerOutputDto
  })
  async updateDealer(
    @Body(new ValidationPipe) updatedDealer: DealerInputDto,
    @Param('dealerId', new ParseUUIDPipe) dealerId: string
  ) {
    return await this.dealersService.updateDealer(dealerId, updatedDealer)
  }

  @Delete('/:dealerId')
  @ApiNoContentResponse({
    description: 'Dealer deleted'
  })
  @ApiNotFoundResponse({
    description: 'Dealer not found',
  })
  async deleteDealer(
    @Param('dealerId', new ParseUUIDPipe) dealerId: string
  ) {
    return await this.dealersService.deleteDealer(dealerId)
  }
}
