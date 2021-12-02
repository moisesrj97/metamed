import * as mongoose from 'mongoose';
import { IsString, Length, IsArray } from 'class-validator';

export class CreateExerciseGroupDto {
  patient: mongoose.Types.ObjectId;

  @IsString()
  @Length(3, 30)
  name: string;
}