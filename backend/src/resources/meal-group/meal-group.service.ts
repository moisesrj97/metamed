import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import validateJwt, { JwtInterface } from '../../helpers/validateJwt';
import {
  Professional,
  ProfessionalDocument,
} from '../professional/professional.schema';
import { CreateMealGroupDto } from './dto/create-meal-group.dto';
import { DeleteMealGroupDto } from './dto/delete-meal-group.dto';
import { UpdateMealGroupDto } from './dto/update-meal-group.dto';
import { MealGroup, MealGroupDocument } from './mealGroup.schema';

@Injectable()
export class MealGroupService {
  constructor(
    @InjectModel(Professional.name)
    private professionalModel: Model<ProfessionalDocument>,
    @InjectModel(MealGroup.name)
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

  async update(
    id: string,
    updateMealGroupDto: UpdateMealGroupDto,
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

    const { name, extra } = updateMealGroupDto;

    const group = await this.mealGroupModel.findOne({ _id: id });

    if (!group || group.author.toString() !== decodedToken.id) {
      throw new Error('Meal group not found');
    }

    return this.mealGroupModel.findByIdAndUpdate(
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
    deleteMealGroupDto: DeleteMealGroupDto,
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

    const group = await this.mealGroupModel.findOne({ _id: id });

    if (!group || group.author.toString() !== decodedToken.id) {
      throw new Error('Meal group not found');
    }

    const { patientId } = deleteMealGroupDto;

    await this.mealGroupModel.findByIdAndDelete(id);

    return this.professionalModel.findByIdAndUpdate(
      { _id: decodedToken.id },
      {
        $pull: {
          'patients.$[elem].mealGroups': id,
        },
      },
      {
        arrayFilters: [{ 'elem.refData': patientId }],
        new: true,
      },
    );
  }
}
