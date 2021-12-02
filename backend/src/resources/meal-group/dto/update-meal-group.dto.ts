import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateMealGroupDto {
  @IsOptional()
  @IsString()
  @Length(3, 30)
  name?: string;

  @IsOptional()
  @IsString()
  @Length(3, 500)
  extra?: string;
}
