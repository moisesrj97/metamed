import { Injectable } from '@nestjs/common';
import { CreateMealGroupDto } from './dto/create-meal-group.dto';
import { UpdateMealGroupDto } from './dto/update-meal-group.dto';

@Injectable()
export class MealGroupService {
  create(createMealGroupDto: CreateMealGroupDto) {
    return 'This action adds a new mealGroup';
  }

  findAll() {
    return `This action returns all mealGroup`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mealGroup`;
  }

  update(id: number, updateMealGroupDto: UpdateMealGroupDto) {
    return `This action updates a #${id} mealGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} mealGroup`;
  }
}
