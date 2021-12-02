import { IsString } from 'class-validator';

export class DeleteNoteDto {
  @IsString()
  patientId?: string;
}
