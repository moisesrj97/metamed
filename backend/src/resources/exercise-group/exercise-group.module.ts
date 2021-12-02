import { Module } from '@nestjs/common';
import { ExerciseGroupService } from './exercise-group.service';
import { ExerciseGroupController } from './exercise-group.controller';
import { ExerciseGroup, ExerciseGroupSchema } from './exerciseGroup.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Patient, PatientSchema } from '../patient/patient.schema';
import {
  Professional,
  ProfessionalSchema,
} from '../professional/professional.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Professional.name, schema: ProfessionalSchema },
      { name: Patient.name, schema: PatientSchema },
      { name: ExerciseGroup.name, schema: ExerciseGroupSchema },
    ]),
  ],
  controllers: [ExerciseGroupController],
  providers: [ExerciseGroupService],
})
export class ExerciseGroupModule {}
