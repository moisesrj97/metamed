import { IsString } from 'class-validator';

export class DeleteMealGroupDto {
  @IsString()
  patientId?: string;
}
