import { IsString, Length, MinLength } from 'class-validator';

export class NewMessageDto {
  @IsString()
  @Length(1, 255)
  to: string;

  @IsString()
  @MinLength(1)
  text: string;
}
