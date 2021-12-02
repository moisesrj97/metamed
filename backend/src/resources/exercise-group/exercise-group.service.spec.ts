import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseGroupService } from './exercise-group.service';

describe('ExerciseGroupService', () => {
  let service: ExerciseGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExerciseGroupService],
    }).compile();

    service = module.get<ExerciseGroupService>(ExerciseGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
