import { IsEmail, IsString, Length } from 'class-validator';

export default class CreateProfessionalDto {
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
  @Length(3, 50)
  businessName: string;
}
