import { Module } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ExerciseController } from './exercise.controller';
import { S3ImageService } from 'src/services/s3-image-service/s3-image-service.service';
import { Exercise, ExerciseSchema } from './exercise.schema';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ExerciseGroup,
  ExerciseGroupSchema,
} from '../exercise-group/exerciseGroup.schema';

@Module({
  controllers: [ExerciseController],
  providers: [ExerciseService, S3ImageService],
  imports: [
    MongooseModule.forFeature([
      { name: Exercise.name, schema: ExerciseSchema },
      { name: ExerciseGroup.name, schema: ExerciseGroupSchema },
    ]),
  ],
})
export class ExerciseModule {}
