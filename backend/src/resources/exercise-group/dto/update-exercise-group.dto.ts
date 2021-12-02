import { PartialType } from '@nestjs/mapped-types';
import { CreateExerciseGroupDto } from './create-exercise-group.dto';

export class UpdateExerciseGroupDto extends PartialType(CreateExerciseGroupDto) {}
