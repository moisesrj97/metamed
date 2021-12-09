import { IsString, Length } from 'class-validator';

export class UpdateExerciseDto {
  @IsString()
  @Length(3, 50)
  name: string;

  @IsString()
  @Length(3, 50)
  amount: string;

  @IsString()
  @Length(3, 100)
  imageUrl: string;
}
