import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Patient, PatientSchema } from '../patient/patient.schema';
import {
  Professional,
  ProfessionalSchema,
} from '../professional/professional.schema';
import { MealGroupService } from './meal-group.service';
import { MealGroup, MealGroupSchema } from './mealGroup.schema';
import * as mongoose from 'mongoose';

describe('Given MealGroupService', () => {
  let service: MealGroupService;

  const professionalMockRepository = {
    findByIdAndUpdate: jest.fn().mockResolvedValue({
      _id: 'f9f9f9f9f9f9',
    }),
  };

  const patientMockRepository = {
    findOne: jest.fn().mockResolvedValue({
      password: '$2a$12$ij9XCn5oFFfy/5b1UnpXv.P/H/3kcIPVSD.m1bbmKeGCzF/viD3eG',
    }),
  };

  const mealGroupMockRepository = {
    create: jest.fn().mockResolvedValue({
      _id: 'f9f9f9f9f9f9',
    }),
    findById: jest.fn().mockReturnValue({
      populate: jest.fn().mockResolvedValue({
        _id: 'f9f9f9f9f9f9',
      }),
    }),
    findOne: jest.fn().mockResolvedValue({
      _id: 'f2f2f2f2f2f2',
      author: 'f8f8f8f8f8f8',
    }),
    findByIdAndUpdate: jest.fn().mockResolvedValue({
      _id: 'f2f2f2f2f2f2',
      author: 'f8f8f8f8f8f8',
    }),
    findByIdAndDelete: jest.fn().mockResolvedValue({}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MealGroupService],
      imports: [
        MongooseModule.forFeature([
          { name: Patient.name, schema: PatientSchema },
          { name: Professional.name, schema: ProfessionalSchema },
          { name: MealGroup.name, schema: MealGroupSchema },
        ]),
      ],
    })
      .overrideProvider(getModelToken('Patient'))
      .useValue(patientMockRepository)
      .overrideProvider(getModelToken('Professional'))
      .useValue(professionalMockRepository)
      .overrideProvider(getModelToken('MealGroup'))
      .useValue(mealGroupMockRepository)
      .compile();

    service = module.get<MealGroupService>(MealGroupService);
  });

  describe('When it is instanciated', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('When service.getById is called with valid data', () => {
    it('It not throw errors and return a professional', async () => {
      process.env.JWT_SECRET = 'test';

      const response = await service.getById(
        '',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiJmOGY4ZjhmOGY4ZjgiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJuYW1lIjoidGVzdCIsImlhdCI6MTUxNjIzOTAyMn0.2D8RXLfMCZRovoodPQNj-XfjaLXhFTk64BlThks42As',
      );

      expect(response).toEqual({
        _id: 'f9f9f9f9f9f9',
      });
    });
  });

  describe('When service.getById is called with invalid token data', () => {
    it('It not throw errors and return a professional', async () => {
      process.env.JWT_SECRET = 'test';

      try {
        await service.getById(
          '',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiJmOGY4ZjhmOGY4ZjgiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJuYW1lIjoidGVzdCIsImlhdCI6MTUxNjIzOTAyMn0.2D8RXLfMCZRovoodPQNj-XfjaLXhFTk64BlThks42As',
        );
      } catch (e) {
        expect(e).toEqual(
          Error('You are not authorized to perform this action'),
        );
      }
    });
  });

  describe('When service.create is called with valid data', () => {
    it('It not throw errors and return a professional', async () => {
      process.env.JWT_SECRET = 'test';

      const response = await service.create(
        {
          name: 'Test',
          patient: new mongoose.Types.ObjectId('f8f8f8f8f8f8'),
        },
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiJmOGY4ZjhmOGY4ZjgiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJuYW1lIjoidGVzdCIsImlhdCI6MTUxNjIzOTAyMn0.2D8RXLfMCZRovoodPQNj-XfjaLXhFTk64BlThks42As',
      );

      expect(response).toEqual({ _id: 'f9f9f9f9f9f9' });
    });
  });

  describe('When service.create is called with token without Bearer', () => {
    it('It throws an error', async () => {
      process.env.JWT_SECRET = 'test';
      try {
        await service.create(
          {
            name: 'Test',
            patient: new mongoose.Types.ObjectId('f8f8f8f8f8f8'),
          },
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiJmOGY4ZjhmOGY4ZjgiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJuYW1lIjoidGVzdCIsImlhdCI6MTUxNjIzOTAyMn0.2D8RXLfMCZRovoodPQNj-XfjaLXhFTk64BlThks42As',
        );
      } catch (e) {
        expect(e.message).toEqual('Error: Invalid token');
      }
    });
  });

  describe('When service.create is called with token without professional role', () => {
    it('It throws an error', async () => {
      process.env.JWT_SECRET = 'test';
      try {
        await service.create(
          {
            name: 'Test',
            patient: new mongoose.Types.ObjectId('f8f8f8f8f8f8'),
          },
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUGF0aWVudCIsImlkIjoiZjhmOGY4ZjhmOGY4IiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwibmFtZSI6InRlc3QiLCJpYXQiOjE1MTYyMzkwMjJ9.meXWG6HkPveRhpZ8O18nXNWaiiu6o-LPjyvTxjnUTTQ',
        );
      } catch (e) {
        expect(e.message).toEqual('Invalid token');
      }
    });
  });

  describe('When service.update is called with valid data', () => {
    it('It not throw errors and return a professional', async () => {
      process.env.JWT_SECRET = 'test';

      const response = await service.update(
        '',
        { name: 'Test', extra: '' },
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiJmOGY4ZjhmOGY4ZjgiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJuYW1lIjoidGVzdCIsImlhdCI6MTUxNjIzOTAyMn0.2D8RXLfMCZRovoodPQNj-XfjaLXhFTk64BlThks42As',
      );

      expect(response).toEqual({
        _id: 'f2f2f2f2f2f2',
        author: 'f8f8f8f8f8f8',
      });
    });
  });

  describe('When service.update is called with token without Bearer', () => {
    it('It throws an error', async () => {
      process.env.JWT_SECRET = 'test';
      try {
        await service.update(
          '',
          { name: 'Test', extra: '' },
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiJmOGY4ZjhmOGY4ZjgiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJuYW1lIjoidGVzdCIsImlhdCI6MTUxNjIzOTAyMn0.2D8RXLfMCZRovoodPQNj-XfjaLXhFTk64BlThks42As',
        );
      } catch (e) {
        expect(e.message).toEqual('Invalid token');
      }
    });
  });

  describe('When service.update is called with token without professional role', () => {
    it('It throws an error', async () => {
      process.env.JWT_SECRET = 'test';
      try {
        await service.update(
          '',
          { name: 'Test', extra: '' },
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUGF0aWVudCIsImlkIjoiZjhmOGY4ZjhmOGY4IiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwibmFtZSI6InRlc3QiLCJpYXQiOjE1MTYyMzkwMjJ9.meXWG6HkPveRhpZ8O18nXNWaiiu6o-LPjyvTxjnUTTQ',
        );
      } catch (e) {
        expect(e.message).toEqual('Invalid token');
      }
    });
  });

  describe('When service.remove is called with valid data', () => {
    it('It not throw errors and return a professional', async () => {
      process.env.JWT_SECRET = 'test';

      const response = await service.remove(
        '',
        { patientId: 'f6f6f6f6f6f6' },
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiJmOGY4ZjhmOGY4ZjgiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJuYW1lIjoidGVzdCIsImlhdCI6MTUxNjIzOTAyMn0.2D8RXLfMCZRovoodPQNj-XfjaLXhFTk64BlThks42As',
      );

      expect(response).toEqual({ _id: 'f9f9f9f9f9f9' });
    });
  });

  describe('When service.remove is called with token without Bearer', () => {
    it('It throws an error', async () => {
      process.env.JWT_SECRET = 'test';
      try {
        await service.remove(
          '',
          { patientId: 'f6f6f6f6f6f6' },
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiJmOGY4ZjhmOGY4ZjgiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJuYW1lIjoidGVzdCIsImlhdCI6MTUxNjIzOTAyMn0.2D8RXLfMCZRovoodPQNj-XfjaLXhFTk64BlThks42As',
        );
      } catch (e) {
        expect(e.message).toEqual('Invalid token');
      }
    });
  });

  describe('When service.remove is called with token without professional role', () => {
    it('It throws an error', async () => {
      process.env.JWT_SECRET = 'test';
      try {
        await service.remove(
          '',
          { patientId: 'f6f6f6f6f6f6' },
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUGF0aWVudCIsImlkIjoiZjhmOGY4ZjhmOGY4IiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwibmFtZSI6InRlc3QiLCJpYXQiOjE1MTYyMzkwMjJ9.meXWG6HkPveRhpZ8O18nXNWaiiu6o-LPjyvTxjnUTTQ',
        );
      } catch (e) {
        expect(e.message).toEqual('Invalid token');
      }
    });
  });
});
