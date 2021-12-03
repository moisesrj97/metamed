import { UnauthorizedException } from '@nestjs/common';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import * as mongoose from 'mongoose';
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
          populate: () => {
            return {
              patients: [
                {
                  refData: new mongoose.Types.ObjectId('f8f8f8f8f8f8'),
                  chatRef: 'f9f9f9f9f9f9',
                },
              ],
            };
          },
        };
      },
      create() {
        return 'create model';
      },
      findByIdAndUpdate() {
        return {
          patients: [
            {
              refData: new mongoose.Types.ObjectId('f8f8f8f8f8f8'),
              chatRef: 'f9f9f9f9f9f9',
            },
          ],
        };
      },
      findByIdAndDelete() {
        return [{ refData: new mongoose.Types.ObjectId('f8f8f8f8f8f8') }];
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

  describe('When service.findOne is executed with valid token and role', () => {
    test('should call findById on model', async () => {
      process.env.JWT_SECRET = 'test';

      const professional = await service.findOne(
        'f8f8f8f8f8f8',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiJmOGY4ZjhmOGY4ZjgiLCJpYXQiOjE1MTYyMzkwMjJ9.a69eQet5_gWhrp-Cbw6OtTJc_JkrTl9TD_Re-Kw5t58',
      );
      expect(professional).toEqual({
        patients: [
          {
            refData: new mongoose.Types.ObjectId('f8f8f8f8f8f8'),
            chatRef: 'f9f9f9f9f9f9',
          },
        ],
      });
    });
  });

  describe('When service.findOne is executed with valid token and different role', () => {
    test('should call findById on model', async () => {
      process.env.JWT_SECRET = 'test';
      try {
        await service.findOne(
          'f8f8f8f8f8f8',
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUGF0aWVudCIsImlkIjoiZjhmOGY4ZjhmOGY4IiwiaWF0IjoxNTE2MjM5MDIyfQ.buuZEL-br9kMX6HvM3YH1bNYttQPKeDfwt3tuCdJxk4',
        );
      } catch (e) {
        expect(e).toEqual(new UnauthorizedException('Invalid token'));
      }
    });
  });

  describe('When service.findOne is executed with valid token and role but not matching ids', () => {
    test('should call findById on model', async () => {
      process.env.JWT_SECRET = 'test';
      try {
        await service.findOne(
          'f8f8f8f8f8f9',
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiJmOGY4ZjhmOGY4ZjgiLCJpYXQiOjE1MTYyMzkwMjJ9.a69eQet5_gWhrp-Cbw6OtTJc_JkrTl9TD_Re-Kw5t58',
        );
      } catch (e) {
        expect(e).toEqual(new UnauthorizedException('Invalid token'));
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
        expect(e).toEqual(new UnauthorizedException('Invalid token'));
      }
    });
  });

  describe('When service.update is executed with valid token and role', () => {
    test('should call findByIdAndUpdate on model', async () => {
      process.env.JWT_SECRET = 'test';

      const professional = await service.update(
        'f8f8f8f8f8f8',
        {
          name: '',
          surname: '',
          businessName: '',
          profilePicture: '',
        },
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiJmOGY4ZjhmOGY4ZjgiLCJpYXQiOjE1MTYyMzkwMjJ9.a69eQet5_gWhrp-Cbw6OtTJc_JkrTl9TD_Re-Kw5t58',
        '' as unknown as Express.Multer.File,
      );
      expect(professional.patients[0].chatRef).toBe('f9f9f9f9f9f9');
    });
  });

  describe('When service.update is executed with valid token and different role', () => {
    test('should call findByIdAndUpdate on model', async () => {
      process.env.JWT_SECRET = 'test';

      try {
        await service.update(
          'f8f8f8f8f8f8',
          {
            name: '',
            surname: '',
            businessName: '',
            profilePicture: '',
          },
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUGF0aWVudCIsImlkIjoiZjhmOGY4ZjhmOGY4IiwiaWF0IjoxNTE2MjM5MDIyfQ.buuZEL-br9kMX6HvM3YH1bNYttQPKeDfwt3tuCdJxk4',
          '' as unknown as Express.Multer.File,
        );
      } catch (e) {
        expect(e).toEqual(new UnauthorizedException('Invalid token'));
      }
    });
  });

  describe('When service.update is executed with valid token and role but not matching ids', () => {
    test('should call findByIdAndUpdate on model', async () => {
      process.env.JWT_SECRET = 'test';

      try {
        await service.update(
          'f8f8f8f8f8f9',
          {
            name: '',
            surname: '',
            businessName: '',
            profilePicture: '',
          },
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiJmOGY4ZjhmOGY4ZjgiLCJpYXQiOjE1MTYyMzkwMjJ9.a69eQet5_gWhrp-Cbw6OtTJc_JkrTl9TD_Re-Kw5t58',
          '' as unknown as Express.Multer.File,
        );
      } catch (e) {
        expect(e).toEqual(new UnauthorizedException('Invalid token'));
      }
    });
  });

  describe('When service.update is executed with invalid token', () => {
    test('should call findByIdAndUpdate on model', async () => {
      process.env.JWT_SECRET = 'test';

      try {
        await service.update(
          'f8f8f8f8f8f9',
          {
            name: '',
            surname: '',
            businessName: '',
            profilePicture: '',
          },
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiJmOGY4ZjhmOGY4ZjgiLCJpYXQiOjE1MTYyMzkwMjJ9.a69eQet5_gWhrp-Cbw6OtTJc_JkrTl9TD_Re-Kw5t58',
          '' as unknown as Express.Multer.File,
        );
      } catch (e) {
        expect(e).toEqual(new UnauthorizedException('Invalid token'));
      }
    });
  });

  describe('When service.update is executed with a file and valid token and role', () => {
    test('should call findByIdAndUpdate on model', async () => {
      process.env.JWT_SECRET = 'test';

      const professional = await service.update(
        'f8f8f8f8f8f8',
        {
          name: '',
          surname: '',
          businessName: '',
          profilePicture: '',
        },
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiJmOGY4ZjhmOGY4ZjgiLCJpYXQiOjE1MTYyMzkwMjJ9.a69eQet5_gWhrp-Cbw6OtTJc_JkrTl9TD_Re-Kw5t58',
        { test: 'test' } as unknown as Express.Multer.File,
      );
      expect(professional.patients[0].chatRef).toBe('f9f9f9f9f9f9');
    });
  });

  describe('When service.update is executed with a file and valid token and different role', () => {
    test('should call findByIdAndUpdate on model', async () => {
      process.env.JWT_SECRET = 'test';

      try {
        await service.update(
          'f8f8f8f8f8f8',
          {
            name: '',
            surname: '',
            businessName: '',
            profilePicture: '',
          },
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUGF0aWVudCIsImlkIjoiZjhmOGY4ZjhmOGY4IiwiaWF0IjoxNTE2MjM5MDIyfQ.buuZEL-br9kMX6HvM3YH1bNYttQPKeDfwt3tuCdJxk4',
          { test: 'test' } as unknown as Express.Multer.File,
        );
      } catch (e) {
        expect(e).toEqual(new UnauthorizedException('Invalid token'));
      }
    });
  });

  describe('When service.update is executed with a file and valid token and role but not matching ids', () => {
    test('should call findByIdAndUpdate on model', async () => {
      process.env.JWT_SECRET = 'test';

      try {
        await service.update(
          'f8f8f8f8f8f9',
          {
            name: '',
            surname: '',
            businessName: '',
            profilePicture: '',
          },
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiJmOGY4ZjhmOGY4ZjgiLCJpYXQiOjE1MTYyMzkwMjJ9.a69eQet5_gWhrp-Cbw6OtTJc_JkrTl9TD_Re-Kw5t58',
          { test: 'test' } as unknown as Express.Multer.File,
        );
      } catch (e) {
        expect(e).toEqual(new UnauthorizedException('Invalid token'));
      }
    });
  });

  describe('When service.update is executed with a file and invalid token', () => {
    test('should call findByIdAndUpdate on model', async () => {
      process.env.JWT_SECRET = 'test';

      try {
        await service.update(
          'f8f8f8f8f8f9',
          {
            name: '',
            surname: '',
            businessName: '',
            profilePicture: '',
          },
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiJmOGY4ZjhmOGY4ZjgiLCJpYXQiOjE1MTYyMzkwMjJ9.a69eQet5_gWhrp-Cbw6OtTJc_JkrTl9TD_Re-Kw5t58',
          { test: 'test' } as unknown as Express.Multer.File,
        );
      } catch (e) {
        expect(e).toEqual(new UnauthorizedException('Invalid token'));
      }
    });
  });

  describe('When service.addPatientToProfessional is executed with valid token and role', () => {
    test('should call findByIdAndUpdate on model', async () => {
      process.env.JWT_SECRET = 'test';

      const professional = await service.addPatientToProfessional(
        'f8f8f8f8f8f8',
        'f8f8f8f8f8f8',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiJmOGY4ZjhmOGY4ZjgiLCJpYXQiOjE1MTYyMzkwMjJ9.a69eQet5_gWhrp-Cbw6OtTJc_JkrTl9TD_Re-Kw5t58',
      );
      expect(professional).toEqual({
        patients: [
          {
            refData: new mongoose.Types.ObjectId('f8f8f8f8f8f8'),
            chatRef: 'f9f9f9f9f9f9',
          },
        ],
      });
    });
  });

  describe('When service.addPatientToProfessional is executed with valid token and different role', () => {
    test('should call findByIdAndUpdate on model', async () => {
      process.env.JWT_SECRET = 'test';

      try {
        await service.addPatientToProfessional(
          'f8f8f8f8f8f8',
          'f8f8f8f8f8f8',
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUGF0aWVudCIsImlkIjoiZjhmOGY4ZjhmOGY4IiwiaWF0IjoxNTE2MjM5MDIyfQ.buuZEL-br9kMX6HvM3YH1bNYttQPKeDfwt3tuCdJxk4',
        );
      } catch (e) {
        expect(e).toEqual(new UnauthorizedException('Invalid token'));
      }
    });
  });

  describe('When service.addPatientToProfessional is executed with valid token and role but not matching ids', () => {
    test('should call findByIdAndUpdate on model', async () => {
      process.env.JWT_SECRET = 'test';

      try {
        await service.addPatientToProfessional(
          'f8f8f8f8f8f8',
          'f8f8f8f8f8f8',
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiJmOGY4ZjhmOGY4ZjgiLCJpYXQiOjE1MTYyMzkwMjJ9.a69eQet5_gWhrp-Cbw6OtTJc_JkrTl9TD_Re-Kw5t58',
        );
      } catch (e) {
        expect(e).toEqual(new UnauthorizedException('Invalid token'));
      }
    });
  });

  describe('When service.addPatientToProfessional is executed with invalid token', () => {
    test('should call findByIdAndUpdate on model', async () => {
      process.env.JWT_SECRET = 'test';

      try {
        await service.addPatientToProfessional(
          'f8f8f8f8f8f8',
          'f8f8f8f8f8f8',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiJmOGY4ZjhmOGY4ZjgiLCJpYXQiOjE1MTYyMzkwMjJ9.a69eQet5_gWhrp-Cbw6OtTJc_JkrTl9TD_Re-Kw5t58',
        );
      } catch (e) {
        expect(e).toEqual(new UnauthorizedException('Invalid token'));
      }
    });
  });

  describe('When service.updatePatientFromProfessional is executed with valid token and role', () => {
    test('should call findByIdAndUpdate on model', async () => {
      process.env.JWT_SECRET = 'test';

      const professional = await service.updatePatientFromProfessional(
        'f8f8f8f8f8f8',
        'f8f8f8f8f8f8',
        [],
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiJmOGY4ZjhmOGY4ZjgiLCJpYXQiOjE1MTYyMzkwMjJ9.a69eQet5_gWhrp-Cbw6OtTJc_JkrTl9TD_Re-Kw5t58',
      );
      expect(professional).toEqual({
        patients: [
          {
            refData: new mongoose.Types.ObjectId('f8f8f8f8f8f8'),
            chatRef: 'f9f9f9f9f9f9',
          },
        ],
      });
    });
  });

  describe('When service.updatePatientFromProfessional is executed with valid token and different role', () => {
    test('should call findByIdAndUpdate on model', async () => {
      process.env.JWT_SECRET = 'test';

      try {
        await service.updatePatientFromProfessional(
          'f8f8f8f8f8f8',
          'f8f8f8f8f8f8',
          [],
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUGF0aWVudCIsImlkIjoiZjhmOGY4ZjhmOGY4IiwiaWF0IjoxNTE2MjM5MDIyfQ.buuZEL-br9kMX6HvM3YH1bNYttQPKeDfwt3tuCdJxk4',
        );
      } catch (e) {
        expect(e).toEqual(new UnauthorizedException('Invalid token'));
      }
    });
  });

  describe('When service.updatePatientFromProfessional is executed with valid token and role but not matching ids', () => {
    test('should call findByIdAndUpdate on model', async () => {
      process.env.JWT_SECRET = 'test';

      try {
        await service.updatePatientFromProfessional(
          'f8f8f8f8f8f8',
          'f8f8f8f8f8f8',
          [],
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiJmOGY4ZjhmOGY4ZjgiLCJpYXQiOjE1MTYyMzkwMjJ9.a69eQet5_gWhrp-Cbw6OtTJc_JkrTl9TD_Re-Kw5t58',
        );
      } catch (e) {
        expect(e).toEqual(new UnauthorizedException('Invalid token'));
      }
    });
  });

  describe('When service.updatePatientFromProfessional is executed with invalid token', () => {
    test('should call findByIdAndUpdate on model', async () => {
      process.env.JWT_SECRET = 'test';

      try {
        await service.updatePatientFromProfessional(
          'f8f8f8f8f8f8',
          'f8f8f8f8f8f8',
          [],
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiJmOGY4ZjhmOGY4ZjgiLCJpYXQiOjE1MTYyMzkwMjJ9.a69eQet5_gWhrp-Cbw6OtTJc_JkrTl9TD_Re-Kw5t58',
        );
      } catch (e) {
        expect(e).toEqual(new UnauthorizedException('Invalid token'));
      }
    });
  });

  describe('When service.removePatientFromProfessional is executed with valid token and role', () => {
    test('should call findByIdAndUpdate on model', async () => {
      process.env.JWT_SECRET = 'test';

      const professional = await service.removePatientFromProfessional(
        'f8f8f8f8f8f8',
        '663866386638663866386638',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiJmOGY4ZjhmOGY4ZjgiLCJpYXQiOjE1MTYyMzkwMjJ9.a69eQet5_gWhrp-Cbw6OtTJc_JkrTl9TD_Re-Kw5t58',
      );
      expect(professional).toEqual({
        patients: [
          {
            refData: new mongoose.Types.ObjectId('f8f8f8f8f8f8'),
            chatRef: 'f9f9f9f9f9f9',
          },
        ],
      });
    });
  });

  describe('When service.updatePatientFromProfessional is executed with valid token and different role', () => {
    test('should call findByIdAndUpdate on model', async () => {
      process.env.JWT_SECRET = 'test';

      try {
        await service.removePatientFromProfessional(
          'f8f8f8f8f8f8',
          '663866386638663866386638',
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUGF0aWVudCIsImlkIjoiZjhmOGY4ZjhmOGY4IiwiaWF0IjoxNTE2MjM5MDIyfQ.buuZEL-br9kMX6HvM3YH1bNYttQPKeDfwt3tuCdJxk4',
        );
      } catch (e) {
        expect(e).toEqual(new UnauthorizedException('Invalid token'));
      }
    });
  });

  describe('When service.updatePatientFromProfessional is executed with valid token and role but not matching ids', () => {
    test('should call findByIdAndUpdate on model', async () => {
      process.env.JWT_SECRET = 'test';

      try {
        await service.removePatientFromProfessional(
          'f8f8f8f8f8f8',
          '663866386638663866386638',
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiJmOGY4ZjhmOGY4ZjgiLCJpYXQiOjE1MTYyMzkwMjJ9.a69eQet5_gWhrp-Cbw6OtTJc_JkrTl9TD_Re-Kw5t58',
        );
      } catch (e) {
        expect(e).toEqual(new UnauthorizedException('Invalid token'));
      }
    });
  });

  describe('When service.updatePatientFromProfessional is executed with invalid token', () => {
    test('should call findByIdAndUpdate on model', async () => {
      process.env.JWT_SECRET = 'test';

      try {
        await service.removePatientFromProfessional(
          'f8f8f8f8f8f8',
          '663866386638663866386638',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiJmOGY4ZjhmOGY4ZjgiLCJpYXQiOjE1MTYyMzkwMjJ9.a69eQet5_gWhrp-Cbw6OtTJc_JkrTl9TD_Re-Kw5t58',
        );
      } catch (e) {
        expect(e).toEqual(new UnauthorizedException('Invalid token'));
      }
    });
  });
});
