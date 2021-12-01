import { Test, TestingModule } from '@nestjs/testing';
import { S3ImageService } from '../../services/s3-image-service/s3-image-service.service';
import { ProfessionalController } from './professional.controller';
import { ProfessionalService } from './professional.service';

describe('ProfessionalController', () => {
  let controller: ProfessionalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [S3ImageService],
      controllers: [ProfessionalController],
      providers: [
        {
          provide: ProfessionalService,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            addPatientToProfessional: jest.fn(),
            updatePatientFromProfessional: jest.fn(),
            removePatientFromProfessional: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProfessionalController>(ProfessionalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
