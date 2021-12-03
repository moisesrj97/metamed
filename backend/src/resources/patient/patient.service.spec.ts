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
              _id: 'f8f8f8f8f8f8',
              name: 'Patient Name',
              email: 'test',
              surname: 'Patient Surname',
              birthDate: 'test',
              gender: 'test',
              role: 'test',
              profilePicture: 'test',
              professionals: [{}],
              password: 'test',
              patients: [{ refData: 'f8f8f8f8f8f8' }],
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

  describe('When service.findOne is executed with valid token and role', () => {
    test('should call findById on model', async () => {
      process.env.JWT_SECRET = 'test';

      const patient = await service.findOne(
        'f8f8f8f8f8f8',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUGF0aWVudCIsImlkIjoiZjhmOGY4ZjhmOGY4IiwiaWF0IjoxNTE2MjM5MDIyfQ.buuZEL-br9kMX6HvM3YH1bNYttQPKeDfwt3tuCdJxk4',
      );
      expect(patient).toEqual({
        _id: 'f8f8f8f8f8f8',
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

  describe('When service.findOne is executed with valid token and different role', () => {
    test('should call findById on model', async () => {
      process.env.JWT_SECRET = 'test';
      try {
        await service.findOne(
          'f8f8f8f8f8f8',
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiJmOGY4ZjhmOGY4ZjgiLCJpYXQiOjE1MTYyMzkwMjJ9.a69eQet5_gWhrp-Cbw6OtTJc_JkrTl9TD_Re-Kw5t58',
        );
      } catch (e) {
        expect(e).toEqual(Error('Invalid token'));
      }
    });
  });

  describe('When service.findOne is executed with valid token and role but not matching ids', () => {
    test('should call findById on model', async () => {
      process.env.JWT_SECRET = 'test';
      try {
        await service.findOne(
          'f8f8f8f8f8f9',
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUGF0aWVudCIsImlkIjoiZjhmOGY4ZjhmOGY4IiwiaWF0IjoxNTE2MjM5MDIyfQ.buuZEL-br9kMX6HvM3YH1bNYttQPKeDfwt3tuCdJxk4',
        );
      } catch (e) {
        expect(e).toEqual(Error('Invalid token'));
      }
    });
  });

  describe('When service.findOne is executed with invalid token', () => {
    test('should call findById on model', async () => {
      process.env.JWT_SECRET = 'test';
      try {
        await service.findOne(
          'f8f8f8f8f8f8',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiJmOGY4ZjhmOGY4ZjgiLCJpYXQiOjE1MTYyMzkwMjJ9.a69eQet5_gWhrp-Cbw6OtTJc_JkrTl9TD_Re-Kw5t58',
        );
      } catch (e) {
        expect(e).toEqual(Error('Invalid token'));
      }
    });
  });

  describe('When service.update is executed with valid token and role', () => {
    test('should call findByIdAndUpdate on model', async () => {
      const patient = await service.update(
        'f8f8f8f8f8f8',
        {
          name: '',
          surname: '',
          gender: '',
          birthDate: '',
          profilePicture: '',
        },
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUGF0aWVudCIsImlkIjoiZjhmOGY4ZjhmOGY4IiwiaWF0IjoxNTE2MjM5MDIyfQ.buuZEL-br9kMX6HvM3YH1bNYttQPKeDfwt3tuCdJxk4',
        '' as unknown as Express.Multer.File,
      );
      expect(patient).toBe('findByIdAndUpdate model');
    });
  });

  describe('When service.update is executed with valid token and different role', () => {
    test('should call findByIdAndUpdate on model', async () => {
      try {
        await service.update(
          'f8f8f8f8f8f8',
          {
            name: '',
            surname: '',
            gender: '',
            birthDate: '',
            profilePicture: '',
          },
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiJmOGY4ZjhmOGY4ZjgiLCJpYXQiOjE1MTYyMzkwMjJ9.a69eQet5_gWhrp-Cbw6OtTJc_JkrTl9TD_Re-Kw5t58',
          '' as unknown as Express.Multer.File,
        );
      } catch (e) {
        expect(e).toEqual(Error('Invalid token'));
      }
    });
  });

  describe('When service.update is executed with valid token and role but not matching ids', () => {
    test('should call findByIdAndUpdate on model', async () => {
      try {
        await service.update(
          'f8f8f8f8f8f9',
          {
            name: '',
            surname: '',
            gender: '',
            birthDate: '',
            profilePicture: '',
          },
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUGF0aWVudCIsImlkIjoiZjhmOGY4ZjhmOGY4IiwiaWF0IjoxNTE2MjM5MDIyfQ.buuZEL-br9kMX6HvM3YH1bNYttQPKeDfwt3tuCdJxk4',
          '' as unknown as Express.Multer.File,
        );
      } catch (e) {
        expect(e).toEqual(Error('Invalid token'));
      }
    });
  });

  describe('When service.update is executed with invalid token', () => {
    test('should call findByIdAndUpdate on model', async () => {
      try {
        await service.update(
          'f8f8f8f8f8f9',
          {
            name: '',
            surname: '',
            gender: '',
            birthDate: '',
            profilePicture: '',
          },
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUGF0aWVudCIsImlkIjoiZjhmOGY4ZjhmOGY4IiwiaWF0IjoxNTE2MjM5MDIyfQ.buuZEL-br9kMX6HvM3YH1bNYttQPKeDfwt3tuCdJxk4',
          '' as unknown as Express.Multer.File,
        );
      } catch (e) {
        expect(e).toEqual(Error('Invalid token'));
      }
    });
  });

  describe('When service.update is executed with a file with valid token and role', () => {
    test('should call findByIdAndUpdate on model', async () => {
      const patient = await service.update(
        'f8f8f8f8f8f8',
        {
          name: '',
          surname: '',
          gender: '',
          birthDate: '',
          profilePicture: '',
        },
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUGF0aWVudCIsImlkIjoiZjhmOGY4ZjhmOGY4IiwiaWF0IjoxNTE2MjM5MDIyfQ.buuZEL-br9kMX6HvM3YH1bNYttQPKeDfwt3tuCdJxk4',
        { test: 'test' } as unknown as Express.Multer.File,
      );
      expect(patient).toBe('findByIdAndUpdate model');
    });
  });

  describe('When service.update is executed with a file with valid token and different role', () => {
    test('should call findByIdAndUpdate on model', async () => {
      try {
        await service.update(
          'f8f8f8f8f8f8',
          {
            name: '',
            surname: '',
            gender: '',
            birthDate: '',
            profilePicture: '',
          },
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiJmOGY4ZjhmOGY4ZjgiLCJpYXQiOjE1MTYyMzkwMjJ9.a69eQet5_gWhrp-Cbw6OtTJc_JkrTl9TD_Re-Kw5t58',
          { test: 'test' } as unknown as Express.Multer.File,
        );
      } catch (e) {
        expect(e).toEqual(Error('Invalid token'));
      }
    });
  });

  describe('When service.update is executed with a file with valid token and role but not matching ids', () => {
    test('should call findByIdAndUpdate on model', async () => {
      try {
        await service.update(
          'f8f8f8f8f8f9',
          {
            name: '',
            surname: '',
            gender: '',
            birthDate: '',
            profilePicture: '',
          },
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUGF0aWVudCIsImlkIjoiZjhmOGY4ZjhmOGY4IiwiaWF0IjoxNTE2MjM5MDIyfQ.buuZEL-br9kMX6HvM3YH1bNYttQPKeDfwt3tuCdJxk4',
          { test: 'test' } as unknown as Express.Multer.File,
        );
      } catch (e) {
        expect(e).toEqual(Error('Invalid token'));
      }
    });
  });

  describe('When service.update is executed with a file with invalid token', () => {
    test('should call findByIdAndUpdate on model', async () => {
      try {
        await service.update(
          'f8f8f8f8f8f9',
          {
            name: '',
            surname: '',
            gender: '',
            birthDate: '',
            profilePicture: '',
          },
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUGF0aWVudCIsImlkIjoiZjhmOGY4ZjhmOGY4IiwiaWF0IjoxNTE2MjM5MDIyfQ.buuZEL-br9kMX6HvM3YH1bNYttQPKeDfwt3tuCdJxk4',
          { test: 'test' } as unknown as Express.Multer.File,
        );
      } catch (e) {
        expect(e).toEqual(Error('Invalid token'));
      }
    });
  });
});
