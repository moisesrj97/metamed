import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { MealGroupService } from './meal-group.service';
import { CreateMealGroupDto } from './dto/create-meal-group.dto';
import { UpdateMealGroupDto } from './dto/update-meal-group.dto';

@Controller('meal-group')
export class MealGroupController {
  constructor(private readonly mealGroupService: MealGroupService) {}

  @Post()
  create(
    @Body() createMealGroupDto: CreateMealGroupDto,
    @Headers('Authorization') token: string,
  ) {
    return this.mealGroupService.create(createMealGroupDto, token);
  }

  @Get(':id')
  getById(@Param('id') id: string, @Headers('Authorization') token: string) {
    return this.mealGroupService.getById(id, token);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMealGroupDto: UpdateMealGroupDto,
    @Headers('Authorization') token: string,
  ) {
    return this.mealGroupService.update(id, updateMealGroupDto, token);
  }

  @Delete(':id/:patientId')
  remove(
    @Param('id') id: string,
    @Param('patientId') patientId: string,
    @Headers('Authorization') token: string,
  ) {
    return this.mealGroupService.remove(id, patientId, token);
  }
}
