import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExerciseGroupService } from './exercise-group.service';
import { CreateExerciseGroupDto } from './dto/create-exercise-group.dto';
import { UpdateExerciseGroupDto } from './dto/update-exercise-group.dto';

@Controller('exercise-group')
export class ExerciseGroupController {
  constructor(private readonly exerciseGroupService: ExerciseGroupService) {}

  @Post()
  create(@Body() createExerciseGroupDto: CreateExerciseGroupDto) {
    return this.exerciseGroupService.create(createExerciseGroupDto);
  }

  @Get()
  findAll() {
    return this.exerciseGroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exerciseGroupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExerciseGroupDto: UpdateExerciseGroupDto) {
    return this.exerciseGroupService.update(+id, updateExerciseGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exerciseGroupService.remove(+id);
  }
}
