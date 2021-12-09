import { IsString, Length } from 'class-validator';
import * as mongoose from 'mongoose';

export class CreateExerciseDto {
  author: mongoose.Types.ObjectId;

  @IsString()
  @Length(3, 100)
  exerciseGroupId: string;

  @IsString()
  @Length(3, 50)
  name: string;

  @IsString()
  @Length(3, 50)
  amount: string;
}
