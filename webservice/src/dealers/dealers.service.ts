import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Dealer } from './entity/dealer';
import { DealerInputDto, DealerOutputDto } from './dto/dealer.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DealersService {
  constructor(
    @InjectRepository(Dealer) private readonly dealerRepository: Repository<Dealer>,
  ) {}

  async getDealers(): Promise<Array<Dealer>> {
    return this.dealerRepository.find()
  }

  async getDealerById(id: string): Promise<Dealer> {
    const dealer = await this.dealerRepository.findOne({
      where: {
        id
      }
    })

    if (!dealer) {
      throw new HttpException('Dealer not found', HttpStatus.NOT_FOUND)
    }

    return dealer
  }

  async createDealer(newDealer: DealerInputDto): Promise<DealerOutputDto> {
    const dealerOutputDto: DealerOutputDto = await this.dealerRepository.save(newDealer)
    return dealerOutputDto
  }

  async updateDealer(id: string, updatedDealer: DealerInputDto): Promise<DealerOutputDto> {
    await this.dealerRepository.update(id, updatedDealer)
    return new DealerOutputDto(DealerInputDto)
  }

  async deleteDealer(id: string): Promise<void> {
    await this.dealerRepository.delete(id)
  }
}
