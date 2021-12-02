import { Injectable } from '@nestjs/common';
import { CreateExerciseGroupDto } from './dto/create-exercise-group.dto';
import { UpdateExerciseGroupDto } from './dto/update-exercise-group.dto';

@Injectable()
export class ExerciseGroupService {
  create(createExerciseGroupDto: CreateExerciseGroupDto) {
    return 'This action adds a new exerciseGroup';
  }

  findAll() {
    return `This action returns all exerciseGroup`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exerciseGroup`;
  }

  update(id: number, updateExerciseGroupDto: UpdateExerciseGroupDto) {
    return `This action updates a #${id} exerciseGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} exerciseGroup`;
  }
}
