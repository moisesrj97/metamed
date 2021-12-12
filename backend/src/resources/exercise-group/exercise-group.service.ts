import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateExerciseGroupDto } from './dto/create-exercise-group.dto';
import { UpdateExerciseGroupDto } from './dto/update-exercise-group.dto';
import validateJwt, { JwtInterface } from '../../helpers/validateJwt';
import { ExerciseGroup, ExerciseGroupDocument } from './exerciseGroup.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Professional,
  ProfessionalDocument,
} from '../professional/professional.schema';
import { isProfessional } from '../../helpers/isProfessional';
import { isAuthor } from '../../helpers/isAuthor';
import { ExerciseService } from '../exercise/exercise.service';

@Injectable()
export class ExerciseGroupService {
  constructor(
    @InjectModel(Professional.name)
    private professionalModel: Model<ProfessionalDocument>,
    @InjectModel(ExerciseGroup.name)
    private exerciseGroupModel: Model<ExerciseGroupDocument>,
    private exerciseService: ExerciseService,
  ) {}

  async getById(id: string, token: string) {
    try {
      validateJwt(token);
    } catch (e) {
      throw new UnauthorizedException(
        'You are not authorized to perform this action',
      );
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

    isProfessional(decodedToken);

    const { name, patient } = createExerciseGroupDto;

    const createdGroup = await this.exerciseGroupModel.create({
      author: decodedToken.id,
      name: name,
      extra: '',
      exercises: [],
    });
    try {
      return await this.professionalModel.findByIdAndUpdate(
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
    } catch (err) {
      throw new NotFoundException('Patient or professional not found');
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
      throw new UnauthorizedException('Invalid token');
    }

    isProfessional(decodedToken);
    await isAuthor(decodedToken, id, this.exerciseGroupModel);

    const { name, extra } = updateExerciseGroupDto;

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

  async remove(id: string, patientId: string, token: string) {
    let decodedToken: JwtInterface;
    try {
      decodedToken = validateJwt(token);
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }

    isProfessional(decodedToken);
    await isAuthor(decodedToken, id, this.exerciseGroupModel);

    const exerciseGroupToDelete = await this.exerciseGroupModel.findById(id);

    for (let i = 0; i < exerciseGroupToDelete.exercises.length; i++) {
      this.exerciseService.remove(
        token,
        exerciseGroupToDelete.exercises[i].toString(),
        id,
      );
    }

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
