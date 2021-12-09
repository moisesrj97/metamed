import { IsOptional, IsString, Length } from 'class-validator';

export default class UpdatePatientDto {
  @IsString()
  @Length(3, 50)
  name: string;

  @IsString()
  @Length(3, 50)
  surname: string;

  @IsOptional()
  @IsString()
  @Length(3, 50)
  gender: string;

  @IsOptional()
  @IsString()
  @Length(3, 50)
  birthDate: string;

  @IsString()
  @Length(5, 200)
  profilePicture: string;
}
