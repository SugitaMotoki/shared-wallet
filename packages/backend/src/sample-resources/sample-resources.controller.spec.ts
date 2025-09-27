import { Test, TestingModule } from '@nestjs/testing';
import { SampleResourcesController } from './sample-resources.controller';
import { SampleResourcesService } from './sample-resources.service';

describe('SampleResourcesController', () => {
  let controller: SampleResourcesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SampleResourcesController],
      providers: [SampleResourcesService],
    }).compile();

    controller = module.get<SampleResourcesController>(SampleResourcesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
