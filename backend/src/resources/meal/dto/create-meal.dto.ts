import { IsString, Length } from 'class-validator';
import * as mongoose from 'mongoose';

export class CreateMealDto {
  author: mongoose.Types.ObjectId;

  @IsString()
  @Length(3, 100)
  mealGroupId: string;

  @IsString()
  @Length(3, 20)
  name: string;

  @IsString()
  @Length(1, 30)
  amount: string;
}
