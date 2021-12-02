import { Module } from '@nestjs/common';
import { ExerciseGroupService } from './exercise-group.service';
import { ExerciseGroupController } from './exercise-group.controller';

@Module({
  controllers: [ExerciseGroupController],
  providers: [ExerciseGroupService]
})
export class ExerciseGroupModule {}
