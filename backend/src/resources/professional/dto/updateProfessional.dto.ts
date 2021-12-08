import { IsOptional, IsString, Length } from 'class-validator';

export default class UpdateProfessionalDto {
  @IsString()
  @Length(3, 50)
  name: string;

  @IsString()
  @Length(3, 50)
  surname: string;

  @IsOptional()
  @IsString()
  @Length(3, 50)
  businessName: string;

  @IsString()
  @Length(5, 200)
  profilePicture: string;
}
