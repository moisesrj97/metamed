import { IsEmail, IsString, Length } from 'class-validator';

export default class CreatePatientDto {
  @IsString()
  @Length(3, 50)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(3, 50)
  password: string;

  @IsString()
  @Length(3, 50)
  surname: string;

  @IsString()
  @Length(3, 20)
  gender: string;

  @IsString()
  @Length(3, 20)
  birthDate: string;
}
