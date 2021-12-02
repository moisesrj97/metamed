import { IsString } from 'class-validator';

export class DeleteExerciseGroupDto {
  @IsString()
  patientId?: string;
}
