import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import validateJwt, { JwtInterface } from '../../helpers/validateJwt';
import { MealGroup, MealGroupDocument } from '../meal-group/mealGroup.schema';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { Meal, MealDocument } from './meal.schema';

@Injectable()
export class MealService {
  constructor(
    @InjectModel(Meal.name)
    private mealModel: Model<MealDocument>,
    @InjectModel(MealGroup.name)
    private mealGroupModel: Model<MealGroupDocument>,
  ) {}

  async create(token: string, createMealDto: CreateMealDto) {
    let response: JwtInterface;
    try {
      response = validateJwt(token);
    } catch (e) {
      throw new Error('You are not authorized to perform this action');
    }

    if (response.role !== 'Professional') {
      throw new Error('You are not authorized to perform this action');
    }

    const createdMeal = await this.mealModel.create({
      author: response.id,
      name: createMealDto.name,
      amount: createMealDto.amount,
    });

    return await this.mealGroupModel.findByIdAndUpdate(
      createMealDto.mealGroupId,
      {
        $push: {
          meals: createdMeal._id,
        },
      },
      { new: true },
    );
  }

  async update(token: string, id: string, updateMealDto: UpdateMealDto) {
    let response: JwtInterface;

    try {
      response = validateJwt(token);
    } catch (e) {
      throw new Error('You are not authorized to perform this action');
    }

    if (response.role !== 'Professional') {
      throw new Error('You are not authorized to perform this action');
    }

    const meal = await this.mealModel.findById(id);
    console.log(meal.author.toString(), response.id);

    if (!meal || meal.author.toString() !== response.id) {
      throw new Error('Exercise not found');
    }

    const { amount, name } = updateMealDto;

    return await this.mealModel.findByIdAndUpdate(
      { _id: id },
      { $set: { amount, name } },
      { new: true },
    );
  }

  async remove(token: string, id: string) {
    let response: JwtInterface;

    try {
      response = validateJwt(token);
    } catch (e) {
      throw new Error('You are not authorized to perform this action');
    }

    if (response.role !== 'Professional') {
      throw new Error('You are not authorized to perform this action');
    }

    const meal = await this.mealModel.findById(id);

    if (!meal || meal.author.toString() !== response.id) {
      throw new Error('Meal not found');
    }

    await this.mealGroupModel.updateMany(
      { meals: { $elemMatch: { $eq: id } } },
      { $pull: { meals: id } },
    );

    return { message: 'Meal removed successfully from groups' };
  }
}
