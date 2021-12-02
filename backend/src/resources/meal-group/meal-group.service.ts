import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

  create(createMealGroupDto: CreateMealGroupDto, token: string) {
    return 'This action adds a new mealGroup';
  }

  getById(id: string, token: string) {
    return `This action returns a #${id} mealGroup`;
  }

  update(id: string, updateMealGroupDto: UpdateMealGroupDto, token: string) {
    return `This action updates a #${id} mealGroup`;
  }

  remove(id: string, token: string) {
    return `This action removes a #${id} mealGroup`;
  }
}
