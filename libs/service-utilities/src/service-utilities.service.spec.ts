import { Test, TestingModule } from '@nestjs/testing';
import { ServiceUtilitiesService } from './service-utilities.service';

describe('ServiceUtilitiesService', () => {
  let service: ServiceUtilitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceUtilitiesService],
    }).compile();

    service = module.get<ServiceUtilitiesService>(ServiceUtilitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
