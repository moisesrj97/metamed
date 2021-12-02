import { Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import validateJwt from '../../helpers/validateJwt';
import { S3ImageService } from 'src/services/s3-image-service/s3-image-service.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ExerciseGroup,
  ExerciseGroupDocument,
} from '../exercise-group/exerciseGroup.schema';
import {
  Professional,
  ProfessionalDocument,
} from '../professional/professional.schema';
import { Exercise, ExerciseDocument } from './exercise.schema';

@Injectable()
export class ExerciseService {
  constructor(
    private s3ImageService: S3ImageService,
    @InjectModel(Exercise.name)
    private exerciseModel: Model<ExerciseDocument>,
    @InjectModel(ExerciseGroup.name)
    private exerciseGroupModel: Model<ExerciseGroupDocument>,
  ) {}
  async create(
    token: string,
    createExerciseDto: CreateExerciseDto,
    exerciseImage: Express.Multer.File,
  ) {
    const response = validateJwt(token);

    if (response.role !== 'Professional') {
      throw new Error('You are not authorized to perform this action');
    }

    const imageUrl = await this.s3ImageService.uploadFile(exerciseImage);

    const createdExercise = await this.exerciseModel.create({
      author: response.id,
      name: createExerciseDto.name,
      amount: createExerciseDto.amount,
      image: imageUrl,
    });

    return await this.exerciseGroupModel.findByIdAndUpdate(
      createExerciseDto.exerciseGroupId,
      {
        $push: {
          exercises: createdExercise._id,
        },
      },
      { new: true },
    );
  }

  async update(
    token: string,
    id: string,
    updateExerciseDto: UpdateExerciseDto,
    exerciseImage: Express.Multer.File,
  ) {
    const response = validateJwt(token);

    if (response.role !== 'Professional') {
      throw new Error('You are not authorized to perform this action');
    }

    const exercise = await this.exerciseModel.findById(id);

    if (!exercise || exercise.author.toString() !== response.id) {
      throw new Error('Exercise not found');
    }

    if (exerciseImage) {
      await this.s3ImageService.updateFile(
        exerciseImage,
        updateExerciseDto.imageUrl,
      );
    }

    const { amount, name } = updateExerciseDto;

    return await this.exerciseModel.findByIdAndUpdate(
      { _id: id },
      { $set: { amount, name } },
      { new: true },
    );
  }

  remove(token: string, id: string) {
    return `This action removes a #${id} exercise`;
  }
}
