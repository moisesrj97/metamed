import { Test, TestingModule } from '@nestjs/testing';
import { ProfessionalController } from './professional.controller';
import { ProfessionalService } from './professional.service';

describe('ProfessionalController', () => {
  let controller: ProfessionalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfessionalController],
      providers: [ProfessionalService],
    }).compile();

    controller = module.get<ProfessionalController>(ProfessionalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
