import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  Get,
} from '@nestjs/common';
import { ExerciseGroupService } from './exercise-group.service';
import { CreateExerciseGroupDto } from './dto/create-exercise-group.dto';
import { UpdateExerciseGroupDto } from './dto/update-exercise-group.dto';
import { DeleteExerciseGroupDto } from './dto/delete-exercise-group.dto';

@Controller('exercise-group')
export class ExerciseGroupController {
  constructor(private readonly exerciseGroupService: ExerciseGroupService) {}

  @Get(':id')
  getById(@Param('id') id: string, @Headers('Authorization') token: string) {
    return this.exerciseGroupService.getById(id, token);
  }

  @Post()
  create(
    @Body() createExerciseGroupDto: CreateExerciseGroupDto,
    @Headers('Authorization') token: string,
  ) {
    return this.exerciseGroupService.create(createExerciseGroupDto, token);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExerciseGroupDto: UpdateExerciseGroupDto,
    @Headers('Authorization') token: string,
  ) {
    return this.exerciseGroupService.update(id, updateExerciseGroupDto, token);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Body() deleteExerciseGroupDto: DeleteExerciseGroupDto,
    @Headers('Authorization') token: string,
  ) {
    return this.exerciseGroupService.remove(id, deleteExerciseGroupDto, token);
  }
}
