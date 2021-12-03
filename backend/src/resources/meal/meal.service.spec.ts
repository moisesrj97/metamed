import { Test, TestingModule } from '@nestjs/testing';
import { MealService } from './meal.service';
import * as mongoose from 'mongoose';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MealGroup, MealGroupSchema } from '../meal-group/mealGroup.schema';
import { Meal, MealSchema } from './meal.schema';

describe('Given MealService', () => {
  let service: MealService;

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
    updateMany: jest.fn().mockResolvedValue({}),
  };

  const mealMockRepository = {
    create: jest.fn().mockResolvedValue({
      _id: 'f9f9f9f9f9f9',
    }),
    findById: jest.fn().mockReturnValue({
      _id: 'f9f9f9f9f9f9',
      author: 'f8f8f8f8f8f8',
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
      providers: [MealService],
      imports: [
        MongooseModule.forFeature([
          { name: MealGroup.name, schema: MealGroupSchema },
          { name: Meal.name, schema: MealSchema },
        ]),
      ],
    })
      .overrideProvider(getModelToken('Meal'))
      .useValue(mealMockRepository)
      .overrideProvider(getModelToken('MealGroup'))
      .useValue(mealGroupMockRepository)
      .compile();

    service = module.get<MealService>(MealService);
  });

  describe('When it is instanciated', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('When service.create is called with valid data', () => {
    it('It should return data without errors', async () => {
      process.env.JWT_SECRET = 'test';
      const response = await service.create(
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiJmOGY4ZjhmOGY4ZjkiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJuYW1lIjoidGVzdCIsImlhdCI6MTUxNjIzOTAyMn0.jYXlg2_VxJ3WpmNPywOlNgmQZNP0q6qA8qf7vNZKM0k',
        {
          author: new mongoose.Types.ObjectId('f8f8f8f8f8f8'),
          name: 'test',
          amount: 'test',
          mealGroupId: 'f9f9f9f9f9f9',
        },
      );
      expect(response).toEqual({
        _id: 'f2f2f2f2f2f2',
        author: 'f8f8f8f8f8f8',
      });
    });
  });

  describe('When service.create is called with invalid token', () => {
    it('It should throw error', async () => {
      process.env.JWT_SECRET = 'test';
      try {
        await service.create(
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiJmOGY4ZjhmOGY4ZjkiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJuYW1lIjoidGVzdCIsImlhdCI6MTUxNjIzOTAyMn0.jYXlg2_VxJ3WpmNPywOlNgmQZNP0q6qA8qf7vNZKM0k',
          {
            author: new mongoose.Types.ObjectId('f8f8f8f8f8f8'),
            name: 'test',
            amount: 'test',
            mealGroupId: 'f9f9f9f9f9f9',
          },
        );
      } catch (e) {
        expect(e).toEqual(
          Error('You are not authorized to perform this action'),
        );
      }
    });
  });

  describe('When service.create is called with patient token', () => {
    it('It should throw error', async () => {
      process.env.JWT_SECRET = 'test';
      try {
        await service.create(
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUGF0aWVudCIsImlkIjoiZjhmOGY4ZjhmOGY5IiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwibmFtZSI6InRlc3QiLCJpYXQiOjE1MTYyMzkwMjJ9.8CsYY9ILF2ZRCaVqBDx64W3NJ2-JMDC37FPYwHnxSGA',
          {
            author: new mongoose.Types.ObjectId('f8f8f8f8f8f8'),
            name: 'test',
            amount: 'test',
            mealGroupId: 'f9f9f9f9f9f9',
          },
        );
      } catch (e) {
        expect(e).toEqual(Error('Invalid token'));
      }
    });
  });

  describe('When service.update is called with valid data', () => {
    it('It should return data without errors', async () => {
      process.env.JWT_SECRET = 'test';
      const response = await service.update(
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiJmOGY4ZjhmOGY4ZjgiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJuYW1lIjoidGVzdCIsImlhdCI6MTUxNjIzOTAyMn0.2D8RXLfMCZRovoodPQNj-XfjaLXhFTk64BlThks42As',
        'f8f8f8f8f8f8',
        {
          name: 'test',
          amount: 'test',
        },
      );
      expect(response).toEqual({
        _id: 'f2f2f2f2f2f2',
        author: 'f8f8f8f8f8f8',
      });
    });
  });

  describe('When service.update is called with invalid token', () => {
    it('It should throw error', async () => {
      process.env.JWT_SECRET = 'test';
      try {
        await service.update(
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiJmOGY4ZjhmOGY4ZjkiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJuYW1lIjoidGVzdCIsImlhdCI6MTUxNjIzOTAyMn0.jYXlg2_VxJ3WpmNPywOlNgmQZNP0q6qA8qf7vNZKM0k',
          'f8f8f8f8f8f8',
          {
            name: 'test',
            amount: 'test',
          },
        );
      } catch (e) {
        expect(e).toEqual(
          Error('You are not authorized to perform this action'),
        );
      }
    });
  });

  describe('When service.update is called with patient token', () => {
    it('It should return data without errors', async () => {
      process.env.JWT_SECRET = 'test';
      try {
        await service.update(
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUGF0aWVudCIsImlkIjoiZjhmOGY4ZjhmOGY5IiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwibmFtZSI6InRlc3QiLCJpYXQiOjE1MTYyMzkwMjJ9.8CsYY9ILF2ZRCaVqBDx64W3NJ2-JMDC37FPYwHnxSGA',
          'f8f8f8f8f8f8',
          {
            name: 'test',
            amount: 'test',
          },
        );
      } catch (e) {
        expect(e).toEqual(Error('Invalid token'));
      }
    });
  });

  describe('When service.update is called with non-author token', () => {
    it('It should return data without errors', async () => {
      process.env.JWT_SECRET = 'test';
      try {
        await service.update(
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiJmOGY4ZjhmOGY4ZjkiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJuYW1lIjoidGVzdCIsImlhdCI6MTUxNjIzOTAyMn0.jYXlg2_VxJ3WpmNPywOlNgmQZNP0q6qA8qf7vNZKM0k',
          'f8f8f8f8f8f8',
          {
            name: 'test',
            amount: 'test',
          },
        );
      } catch (e) {
        expect(e).toEqual(Error('Element not found'));
      }
    });
  });

  describe('When service.remove is called with valid data', () => {
    it('It should return data without errors', async () => {
      process.env.JWT_SECRET = 'test';
      const response = await service.remove(
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiJmOGY4ZjhmOGY4ZjgiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJuYW1lIjoidGVzdCIsImlhdCI6MTUxNjIzOTAyMn0.2D8RXLfMCZRovoodPQNj-XfjaLXhFTk64BlThks42As',
        'f8f8f8f8f8f8',
      );
      expect(response).toEqual({
        message: 'Meal removed successfully from groups',
      });
    });
  });

  describe('When service.remove is called with invalid token', () => {
    it('It should throw error', async () => {
      process.env.JWT_SECRET = 'test';
      try {
        await service.remove(
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiJmOGY4ZjhmOGY4ZjkiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJuYW1lIjoidGVzdCIsImlhdCI6MTUxNjIzOTAyMn0.jYXlg2_VxJ3WpmNPywOlNgmQZNP0q6qA8qf7vNZKM0k',
          'f8f8f8f8f8f8',
        );
      } catch (e) {
        expect(e).toEqual(
          Error('You are not authorized to perform this action'),
        );
      }
    });
  });

  describe('When service.remove is called with non-author token', () => {
    it('It should return data without errors', async () => {
      process.env.JWT_SECRET = 'test';
      try {
        await service.remove(
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUHJvZmVzc2lvbmFsIiwiaWQiOiJmOGY4ZjhmOGY4ZjkiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJuYW1lIjoidGVzdCIsImlhdCI6MTUxNjIzOTAyMn0.jYXlg2_VxJ3WpmNPywOlNgmQZNP0q6qA8qf7vNZKM0k',
          'f8f8f8f8f8f8',
        );
      } catch (e) {
        expect(e).toEqual(Error('Element not found'));
      }
    });
  });

  describe('When service.remove is called with patient token', () => {
    it('It should return data without errors', async () => {
      process.env.JWT_SECRET = 'test';
      try {
        await service.remove(
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiUGF0aWVudCIsImlkIjoiZjhmOGY4ZjhmOGY5IiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwibmFtZSI6InRlc3QiLCJpYXQiOjE1MTYyMzkwMjJ9.8CsYY9ILF2ZRCaVqBDx64W3NJ2-JMDC37FPYwHnxSGA',
          'f8f8f8f8f8f8',
        );
      } catch (e) {
        expect(e).toEqual(Error('Invalid token'));
      }
    });
  });
});
