import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateNoteDto {
  @IsOptional()
  @IsString()
  @Length(3, 50)
  title?: string;

  @IsOptional()
  @IsString()
  @Length(3, 500)
  description?: string;
}
