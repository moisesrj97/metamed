import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { MealService } from './meal.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';

@Controller('meal')
export class MealController {
  constructor(private readonly mealService: MealService) {}

  @Post()
  create(
    @Body() createMealDto: CreateMealDto,
    @Headers('Authorization') token: string,
  ) {
    return this.mealService.create(token, createMealDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMealDto: UpdateMealDto,
    @Headers('Authorization') token: string,
  ) {
    return this.mealService.update(token, id, updateMealDto);
  }

  @Delete(':id/:groupId')
  remove(
    @Param('id') id: string,
    @Param('groupId') groupId: string,
    @Headers('Authorization') token: string,
  ) {
    return this.mealService.remove(token, id, groupId);
  }
}
