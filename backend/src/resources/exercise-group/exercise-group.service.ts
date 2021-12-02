import { Injectable } from '@nestjs/common';
import { CreateExerciseGroupDto } from './dto/create-exercise-group.dto';
import { UpdateExerciseGroupDto } from './dto/update-exercise-group.dto';
import { DeleteExerciseGroupDto } from './dto/delete-exercise-group.dto';
import validateJwt, { JwtInterface } from '../../helpers/validateJwt';
import { ExerciseGroup, ExerciseGroupDocument } from './exerciseGroup.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Professional,
  ProfessionalDocument,
} from '../professional/professional.schema';

@Injectable()
export class ExerciseGroupService {
  constructor(
    @InjectModel(Professional.name)
    private professionalModel: Model<ProfessionalDocument>,
    @InjectModel(ExerciseGroup.name)
    private exerciseGroupModel: Model<ExerciseGroupDocument>,
  ) {}

  async getById(id: string, token: string) {
    try {
      validateJwt(token);
    } catch (e) {
      throw new Error('You are not authorized to perform this action');
    }

    return await this.exerciseGroupModel.findById(id).populate('exercises');
  }

  async create(createExerciseGroupDto: CreateExerciseGroupDto, token: string) {
    let decodedToken: JwtInterface;
    try {
      decodedToken = validateJwt(token);
    } catch (err) {
      throw new Error(err);
    }

    if (decodedToken.role !== 'Professional') {
      throw new Error('Invalid token');
    }

    const { name, patient } = createExerciseGroupDto;

    const createdGroup = await this.exerciseGroupModel.create({
      author: decodedToken.id,
      name: name,
      extra: '',
      exercises: [],
    });
    try {
      const result = await this.professionalModel.findByIdAndUpdate(
        { _id: decodedToken.id },
        {
          $push: {
            'patients.$[elem].exerciseGroups': createdGroup._id,
          },
        },
        {
          arrayFilters: [{ 'elem.refData': patient }],
          new: true,
        },
      );

      return result;
    } catch (err) {
      throw new Error('Patient or professional not found');
    }
  }

  async update(
    id: string,
    updateExerciseGroupDto: UpdateExerciseGroupDto,
    token: string,
  ) {
    let decodedToken: JwtInterface;
    try {
      decodedToken = validateJwt(token);
    } catch (err) {
      throw new Error('Invalid token');
    }

    if (decodedToken.role !== 'Professional') {
      throw new Error('Invalid token');
    }

    const { name, extra } = updateExerciseGroupDto;

    const group = await this.exerciseGroupModel.findOne({ _id: id });

    if (!group || group.author.toString() !== decodedToken.id) {
      throw new Error('Exercise group not found');
    }

    return this.exerciseGroupModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          name: name,
          extra: extra,
        },
      },
      { new: true },
    );
  }

  async remove(
    id: string,
    deleteExerciseGroupDto: DeleteExerciseGroupDto,
    token: string,
  ) {
    let decodedToken: JwtInterface;
    try {
      decodedToken = validateJwt(token);
    } catch (err) {
      throw new Error('Invalid token');
    }

    if (decodedToken.role !== 'Professional') {
      throw new Error('Invalid token');
    }

    const group = await this.exerciseGroupModel.findOne({ _id: id });

    if (!group || group.author.toString() !== decodedToken.id) {
      throw new Error('Exercise group not found');
    }

    const { patientId } = deleteExerciseGroupDto;

    await this.exerciseGroupModel.findByIdAndDelete(id);

    return this.professionalModel.findByIdAndUpdate(
      { _id: decodedToken.id },
      {
        $pull: {
          'patients.$[elem].exerciseGroups': id,
        },
      },
      {
        arrayFilters: [{ 'elem.refData': patientId }],
        new: true,
      },
    );
  }
}
