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
import { ExerciseService } from '../exercise/exercise.service';
import { S3ImageService } from 'src/services/s3-image-service/s3-image-service.service';
import { Exercise, ExerciseSchema } from '../exercise/exercise.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Professional.name, schema: ProfessionalSchema },
      { name: Patient.name, schema: PatientSchema },
      { name: ExerciseGroup.name, schema: ExerciseGroupSchema },
      { name: Exercise.name, schema: ExerciseSchema },
    ]),
  ],
  controllers: [ExerciseGroupController],
  providers: [ExerciseGroupService, ExerciseService, S3ImageService],
})
export class ExerciseGroupModule {}
