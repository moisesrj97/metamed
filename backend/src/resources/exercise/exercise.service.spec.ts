import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { S3ImageService } from '../../services/s3-image-service/s3-image-service.service';
import {
  ExerciseGroup,
  ExerciseGroupSchema,
} from '../exercise-group/exerciseGroup.schema';
import { Exercise, ExerciseSchema } from './exercise.schema';
import { ExerciseService } from './exercise.service';

describe('ExerciseService', () => {
  let service: ExerciseService;

  const exerciseGroupMockRepository = {
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

  const exerciseMockRepository = {
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
      providers: [ExerciseService, S3ImageService],
      imports: [
        MongooseModule.forFeature([
          { name: ExerciseGroup.name, schema: ExerciseGroupSchema },
          { name: Exercise.name, schema: ExerciseSchema },
        ]),
      ],
    })
      .overrideProvider(getModelToken('Exercise'))
      .useValue(exerciseMockRepository)
      .overrideProvider(getModelToken('ExerciseGroup'))
      .useValue(exerciseGroupMockRepository)
      .compile();

    service = module.get<ExerciseService>(ExerciseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
