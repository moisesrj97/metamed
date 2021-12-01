import { IsEmail, IsString, Length } from 'class-validator';

export default class UpdatePatientDto {
  @IsString()
  @Length(3, 50)
  name: string;

  @IsString()
  @Length(3, 50)
  surname: string;

  @IsString()
  @Length(3, 20)
  gender: string;

  @IsString()
  @Length(3, 20)
  birthDate: string;

  @IsString()
  @Length(5, 200)
  profilePicture: string;
}