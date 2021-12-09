import * as mongoose from 'mongoose';
import { IsString, Length } from 'class-validator';

export class CreateMealGroupDto {
  patient: mongoose.Types.ObjectId;

  @IsString()
  @Length(3, 50)
  name: string;
}
