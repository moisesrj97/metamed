import { Injectable } from '@nestjs/common';
import { CreateExerciseGroupDto } from './dto/create-exercise-group.dto';
import { UpdateExerciseGroupDto } from './dto/update-exercise-group.dto';
import validateJwt, { JwtInterface } from '../../helpers/validateJwt';
import { ExerciseGroup, ExerciseGroupDocument } from './exerciseGroup.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patient, PatientDocument } from '../patient/patient.schema';
import {
  Professional,
  ProfessionalDocument,
} from '../professional/professional.schema';
import { decode } from 'punycode';

@Injectable()
export class ExerciseGroupService {
  constructor(
    @InjectModel(Professional.name)
    private professionalModel: Model<ProfessionalDocument>,
    @InjectModel(Patient.name)
    private patientModel: Model<PatientDocument>,
    @InjectModel(ExerciseGroup.name)
    private exerciseGroupModel: Model<ExerciseGroupDocument>,
  ) {}

  async create(createExerciseGroupDto: CreateExerciseGroupDto, token: string) {
    let decodedToken: JwtInterface;
    try {
      decodedToken = validateJwt(token);
    } catch (err) {
      throw new Error('Invalid token');
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

    console.log(decodedToken.role);
    if (decodedToken.role !== 'Professional') {
      throw new Error('Invalid token');
    }

    const { name, extra } = updateExerciseGroupDto;

    const group = await this.exerciseGroupModel.findOne({ _id: id });

    if (!group) {
      throw new Error('Exercise group not found');
    }

    if (group.author.toString() !== decodedToken.id) {
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

  remove(id: string, token: string) {
    return `This action removes a #${id} exerciseGroup`;
  }
}
