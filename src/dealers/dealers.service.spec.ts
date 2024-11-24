import { Test, TestingModule } from '@nestjs/testing';
import { DealersService } from './dealers.service';

describe('DealersService', () => {
  let service: DealersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DealersService],
    }).compile();

    service = module.get<DealersService>(DealersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
