import { IsEmail, IsString, Length } from 'class-validator';

export default class updateProfessionalDto {
  @IsString()
  @Length(3, 50)
  name: string;

  @IsString()
  @Length(3, 50)
  surname: string;

  @IsString()
  @Length(3, 50)
  businessName: string;

  @IsString()
  @Length(5, 200)
  profilePicture: string;
}
