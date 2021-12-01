import { Test, TestingModule } from '@nestjs/testing';
import CreatePatientDto from './dto/createPatient.dto';
import UpdatePatientDto from './dto/updatePatient.dto';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';

describe('Given the PatientController', () => {
  let controller: PatientController;
  let service: PatientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientController],
      providers: [
        {
          provide: PatientService,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PatientController>(PatientController);
    service = module.get<PatientService>(PatientService);
  });
  describe('When it is instanciated', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  });

  describe('When controller.create is executed', () => {
    it('Service.create is called', () => {
      controller.create(
        new CreatePatientDto(),
        '' as unknown as Express.Multer.File,
      );

      expect(service.create).toHaveBeenCalled();
    });
  });

  describe('When controller.findOne is executed', () => {
    it('Service.findOne is called', () => {
      controller.findOne('');

      expect(service.findOne).toHaveBeenCalled();
    });
  });

  describe('When controller.update is executed', () => {
    it('Service.update is called', () => {
      controller.update(
        '',
        new UpdatePatientDto(),
        '' as unknown as Express.Multer.File,
      );

      expect(service.update).toHaveBeenCalled();
    });
  });
});
