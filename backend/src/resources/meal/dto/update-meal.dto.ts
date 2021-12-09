import { IsString, Length } from 'class-validator';

export class UpdateMealDto {
  @IsString()
  @Length(3, 50)
  name: string;

  @IsString()
  @Length(3, 50)
  amount: string;
}
