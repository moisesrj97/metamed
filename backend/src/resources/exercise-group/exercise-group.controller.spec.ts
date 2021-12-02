import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseGroupController } from './exercise-group.controller';
import { ExerciseGroupService } from './exercise-group.service';

describe('ExerciseGroupController', () => {
  let controller: ExerciseGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExerciseGroupController],
      providers: [ExerciseGroupService],
    }).compile();

    controller = module.get<ExerciseGroupController>(ExerciseGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
