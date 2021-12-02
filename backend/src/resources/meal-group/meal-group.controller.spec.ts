import { Test, TestingModule } from '@nestjs/testing';
import { MealGroupController } from './meal-group.controller';
import { MealGroupService } from './meal-group.service';

describe('MealGroupController', () => {
  let controller: MealGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MealGroupController],
      providers: [MealGroupService],
    }).compile();

    controller = module.get<MealGroupController>(MealGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
