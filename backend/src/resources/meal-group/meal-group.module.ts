import { Module } from '@nestjs/common';
import { MealGroupService } from './meal-group.service';
import { MealGroupController } from './meal-group.controller';

@Module({
  controllers: [MealGroupController],
  providers: [MealGroupService]
})
export class MealGroupModule {}
