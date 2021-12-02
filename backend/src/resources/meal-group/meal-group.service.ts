import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import validateJwt, { JwtInterface } from '../../helpers/validateJwt';
import { ExerciseGroup } from '../exercise-group/exerciseGroup.schema';
import {
  Professional,
  ProfessionalDocument,
} from '../professional/professional.schema';
import { CreateMealGroupDto } from './dto/create-meal-group.dto';
import { UpdateMealGroupDto } from './dto/update-meal-group.dto';
import { MealGroupDocument } from './mealGroup.schema';

@Injectable()
export class MealGroupService {
  constructor(
    @InjectModel(Professional.name)
    private professionalModel: Model<ProfessionalDocument>,
    @InjectModel(ExerciseGroup.name)
    private mealGroupModel: Model<MealGroupDocument>,
  ) {}

  async create(createMealGroupDto: CreateMealGroupDto, token: string) {
    let decodedToken: JwtInterface;
    try {
      decodedToken = validateJwt(token);
    } catch (err) {
      throw new Error(err);
    }

    if (decodedToken.role !== 'Professional') {
      throw new Error('Invalid token');
    }

    const { name, patient } = createMealGroupDto;

    const createdGroup = await this.mealGroupModel.create({
      author: decodedToken.id,
      name: name,
      extra: '',
      meals: [],
    });
    try {
      const result = await this.professionalModel.findByIdAndUpdate(
        { _id: decodedToken.id },
        {
          $push: {
            'patients.$[elem].mealGroups': createdGroup._id,
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

  async getById(id: string, token: string) {
    try {
      validateJwt(token);
    } catch (e) {
      throw new Error('You are not authorized to perform this action');
    }

    return await this.mealGroupModel.findById(id).populate('meals');
  }

  update(id: string, updateMealGroupDto: UpdateMealGroupDto, token: string) {
    return `This action updates a #${id} mealGroup`;
  }

  remove(id: string, token: string) {
    return `This action removes a #${id} mealGroup`;
  }
}
