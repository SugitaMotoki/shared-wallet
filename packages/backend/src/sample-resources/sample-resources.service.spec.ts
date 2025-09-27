import { Test, TestingModule } from '@nestjs/testing';
import { SampleResourcesService } from './sample-resources.service';

describe('SampleResourcesService', () => {
  let service: SampleResourcesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SampleResourcesService],
    }).compile();

    service = module.get<SampleResourcesService>(SampleResourcesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
