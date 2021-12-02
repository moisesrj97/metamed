import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MealGroupService } from './meal-group.service';
import { CreateMealGroupDto } from './dto/create-meal-group.dto';
import { UpdateMealGroupDto } from './dto/update-meal-group.dto';

@Controller('meal-group')
export class MealGroupController {
  constructor(private readonly mealGroupService: MealGroupService) {}

  @Post()
  create(@Body() createMealGroupDto: CreateMealGroupDto) {
    return this.mealGroupService.create(createMealGroupDto);
  }

  @Get()
  findAll() {
    return this.mealGroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mealGroupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMealGroupDto: UpdateMealGroupDto) {
    return this.mealGroupService.update(+id, updateMealGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mealGroupService.remove(+id);
  }
}
