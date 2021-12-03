import { Test, TestingModule } from '@nestjs/testing';
import { S3ImageService } from '../../services/s3-image-service/s3-image-service.service';
import CreateProfessionalDto from './dto/createProfessional.dto';
import updateProfessionalDto from './dto/updateProfessional.dto';
import { ProfessionalController } from './professional.controller';
import { ProfessionalService } from './professional.service';

describe('Given ProfessionalController...', () => {
  let controller: ProfessionalController;
  let service: ProfessionalService;

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
    service = module.get<ProfessionalService>(ProfessionalService);
  });

  describe('When it is instanciated...', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  });

  describe('When controller.create is executed', () => {
    it('Service.create is called', () => {
      controller.create(
        new CreateProfessionalDto(),
        '' as unknown as Express.Multer.File,
      );

      expect(service.create).toHaveBeenCalled();
    });
  });

  describe('When controller.findOne is executed', () => {
    it('Service.findOne is called', () => {
      controller.findOne('', '');

      expect(service.findOne).toHaveBeenCalled();
    });
  });

  describe('When controller.update is executed', () => {
    it('Service.update is called', () => {
      controller.update(
        '',
        new updateProfessionalDto(),
        '',
        '' as unknown as Express.Multer.File,
      );

      expect(service.update).toHaveBeenCalled();
    });
  });

  describe('When controller.addPatient is executed', () => {
    it('Service.addPatientToProfessional is called', () => {
      controller.addPatient('', '', '');

      expect(service.addPatientToProfessional).toHaveBeenCalled();
    });
  });

  describe('When controller.updatePatient is executed', () => {
    it('Service.updatePatientFromProfessional is called', () => {
      controller.updatePatient('', '', [], '');

      expect(service.updatePatientFromProfessional).toHaveBeenCalled();
    });
  });

  describe('When controller.removePatient is executed', () => {
    it('Service.removePatient is called', () => {
      controller.removePatient('', '', '');

      expect(service.removePatientFromProfessional).toHaveBeenCalled();
    });
  });
});
