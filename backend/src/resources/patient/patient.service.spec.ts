import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { S3ImageService } from '../../services/s3-image-service/s3-image-service.service';
import {
  Professional,
  ProfessionalSchema,
} from '../professional/professional.schema';
import { PatientEntity } from './entities/patient.entity';
import { Patient, PatientSchema } from './patient.schema';
import { PatientService } from './patient.service';

describe('Given PatientService', () => {
  let service: PatientService;

  beforeEach(async () => {
    const mockRepository = {
      findById() {
        return {
          populate: () => {
            return {
              _id: '5e8f8f8f8f8f8f8f8f8f8f8',
              name: 'Patient Name',
              email: 'test',
              surname: 'Patient Surname',
              birthDate: 'test',
              gender: 'test',
              role: 'test',
              profilePicture: 'test',
              professionals: [{}],
              password: 'test',
              patients: [{ refData: '5e8f8f8f8f8f8f8f8f8f8f8' }],
            };
          },
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
          { name: Patient.name, schema: PatientSchema },
          { name: Professional.name, schema: ProfessionalSchema },
        ]),
      ],
      providers: [
        PatientService,
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
      .compile();

    service = module.get<PatientService>(PatientService);
  });
  describe('When it is instanciated', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('When service.create is executed', () => {
    test('should call create on model', async () => {
      const patient = await service.create(
        new PatientEntity('', '', '', '', '', '', 'test'),
        '' as unknown as Express.Multer.File,
      );
      expect(patient).toBe('create model');
    });
  });

  describe('When service.findOne is executed', () => {
    test('should call findById on model', async () => {
      const patient = await service.findOne('5e8f8f8f8f8f8f8f8f8f8f8');
      expect(patient).toEqual({
        _id: '5e8f8f8f8f8f8f8f8f8f8f8',
        birthDate: 'test',
        email: 'test',
        gender: 'test',
        name: 'Patient Name',
        password: 'test',
        professionals: [
          {
            chatRef: undefined,
            exerciseGroups: undefined,
            mealGroups: undefined,
            notes: undefined,
            refData: undefined,
          },
        ],
        profilePicture: 'test',
        role: 'test',
        surname: 'Patient Surname',
      });
    });
  });

  describe('When service.update is executed', () => {
    test('should call findByIdAndUpdate on model', async () => {
      const patient = await service.update(
        '',
        {
          name: '',
          surname: '',
          gender: '',
          birthDate: '',
          profilePicture: '',
        },
        '' as unknown as Express.Multer.File,
      );
      expect(patient).toBe('findByIdAndUpdate model');
    });
  });

  describe('When service.update is executed with a file', () => {
    test('should call findByIdAndUpdate on model', async () => {
      const patient = await service.update(
        '',
        {
          name: '',
          surname: '',
          gender: '',
          birthDate: '',
          profilePicture: '',
        },
        { test: 'test' } as unknown as Express.Multer.File,
      );
      expect(patient).toBe('findByIdAndUpdate model');
    });
  });
});
