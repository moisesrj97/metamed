import { IsString, Length } from 'class-validator';

export class UpdateMealDto {
  @IsString()
  @Length(3, 20)
  name: string;

  @IsString()
  @Length(3, 20)
  amount: string;
}
