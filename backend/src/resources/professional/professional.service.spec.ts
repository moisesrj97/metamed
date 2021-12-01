import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { S3ImageService } from '../../services/s3-image-service/s3-image-service.service';
import { Chat, ChatSchema } from '../chat/chat.schema';
import { Patient, PatientSchema } from '../patient/patient.schema';
import { ProfessionalEntity } from './entities/professional.entity';
import { ProfessionalController } from './professional.controller';
import { Professional, ProfessionalSchema } from './professional.schema';
import { ProfessionalService } from './professional.service';

describe('Given ProfessionalService', () => {
  let service: ProfessionalService;

  beforeEach(async () => {
    const mockRepository = {
      findById() {
        return {
          populate: () => 'findById model',
        };
      },
      create() {
        return 'create model';
      },
      findByIdAndUpdate() {
        return 'findByIdAndUpdate model';
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([
          { name: Professional.name, schema: ProfessionalSchema },
          { name: Patient.name, schema: PatientSchema },
          { name: Chat.name, schema: ChatSchema },
        ]),
      ],
      controllers: [ProfessionalController],
      providers: [
        ProfessionalService,
        {
          provide: S3ImageService,
          useValue: {
            uploadFile: jest.fn(),
            deleteFile: jest.fn(),
            updateFile: jest.fn(),
          },
        },
      ],
    })
      .overrideProvider(getModelToken('Patient'))
      .useValue(mockRepository)
      .overrideProvider(getModelToken('Professional'))
      .useValue(mockRepository)
      .overrideProvider(getModelToken('Chat'))
      .useValue(mockRepository)
      .compile();

    service = module.get<ProfessionalService>(ProfessionalService);
  });
  describe('When it is instanciated', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('When service.create is executed', () => {
    test('should call create on model', async () => {
      const professional = await service.create(
        new ProfessionalEntity('', '', '', '', '', 'test'),
        '' as unknown as Express.Multer.File,
      );
      expect(professional).toBe('create model');
    });
  });

  describe('When service.findOne is executed', () => {
    test('should call findById on model', async () => {
      const professional = await service.findOne('');
      expect(professional).toBe('findById model');
    });
  });

  describe('When service.update is executed', () => {
    test('should call findByIdAndUpdate on model', async () => {
      const professional = await service.update(
        '',
        { name: '', surname: '', businessName: '', profilePicture: '' },
        '' as unknown as Express.Multer.File,
      );
      expect(professional).toBe('findByIdAndUpdate model');
    });
  });

  describe('When service.update is executed with a file', () => {
    test('should call findByIdAndUpdate on model', async () => {
      const professional = await service.update(
        '',
        { name: '', surname: '', businessName: '', profilePicture: '' },
        { test: 'test' } as unknown as Express.Multer.File,
      );
      expect(professional).toBe('findByIdAndUpdate model');
    });
  });

  describe('When service.addPatientToProfessional is executed', () => {
    test('should call findByIdAndUpdate on model', async () => {
      const professional = await service.addPatientToProfessional(
        '61a4f4a93d6cc562f1fb52a9',
        '61a4f4a93d6cc562f1fb52a9',
      );
      expect(professional).toBe('findByIdAndUpdate model');
    });
  });

  describe('When service.updatePatientFromProfessional is executed', () => {
    test('should call findByIdAndUpdate on model', async () => {
      const professional = await service.updatePatientFromProfessional(
        '61a4f4a93d6cc562f1fb52a9',
        '61a4f4a93d6cc562f1fb52a9',
        [],
      );
      expect(professional).toBe('findByIdAndUpdate model');
    });
  });

  describe('When service.removePatientFromProfessional is executed', () => {
    test('should call findByIdAndUpdate on model', async () => {
      const professional = await service.removePatientFromProfessional(
        '61a4f4a93d6cc562f1fb52a9',
        '61a4f4a93d6cc562f1fb52a9',
      );
      expect(professional).toBe('findByIdAndUpdate model');
    });
  });
});
