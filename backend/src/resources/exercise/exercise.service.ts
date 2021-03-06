import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import validateJwt, { JwtInterface } from '../../helpers/validateJwt';
import { S3ImageService } from '../../services/s3-image-service/s3-image-service.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  ExerciseGroup,
  ExerciseGroupDocument,
} from '../exercise-group/exerciseGroup.schema';

import { Exercise, ExerciseDocument } from './exercise.schema';
import { isProfessional } from '../../helpers/isProfessional';
import { isAuthor } from '../../helpers/isAuthor';

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
    let response: JwtInterface;
    try {
      response = validateJwt(token);
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }

    isProfessional(response);

    const imageUrl = await this.s3ImageService.uploadFile(exerciseImage);

    const createdExercise = await this.exerciseModel.create({
      author: response.id,
      name: createExerciseDto.name,
      amount: createExerciseDto.amount,
      image: imageUrl,
    });

    await this.exerciseGroupModel.findByIdAndUpdate(
      createExerciseDto.exerciseGroupId,
      {
        $push: {
          exercises: createdExercise._id,
        },
      },
      { new: true },
    );

    return createdExercise;
  }

  async update(
    token: string,
    id: string,
    updateExerciseDto: UpdateExerciseDto,
    exerciseImage: Express.Multer.File,
  ) {
    let response: JwtInterface;

    try {
      response = validateJwt(token);
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }

    isProfessional(response);
    await isAuthor(response, id, this.exerciseModel);

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

  async remove(token: string, id: string, exerciseGroupId: string) {
    let response: JwtInterface;

    try {
      response = validateJwt(token);
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }

    isProfessional(response);
    await isAuthor(response, id, this.exerciseModel);

    await this.exerciseGroupModel.findByIdAndUpdate(
      exerciseGroupId,
      { $pull: { exercises: id } },
      { new: true },
    );

    const exerciseToDelete = await this.exerciseModel.findById(id);

    await this.s3ImageService.deleteFile(exerciseToDelete.image);

    await this.exerciseModel.findByIdAndDelete(id);

    return { message: 'Exercise removed successfully from groups' };
  }
}
