import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Post()
  @UseInterceptors(FileInterceptor('exerciseImage'))
  create(
    @Body() createExerciseDto: CreateExerciseDto,
    @Headers('Authorization') token: string,
    @UploadedFile() exerciseImage: Express.Multer.File,
  ) {
    return this.exerciseService.create(token, createExerciseDto, exerciseImage);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('exerciseImage'))
  update(
    @Param('id') id: string,
    @Body() updateExerciseDto: UpdateExerciseDto,
    @Headers('Authorization') token: string,
    @UploadedFile() exerciseImage?: Express.Multer.File,
  ) {
    return this.exerciseService.update(
      token,
      id,
      updateExerciseDto,
      exerciseImage,
    );
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Param('groupId') groupId: string,
    @Headers('Authorization') token: string,
  ) {
    return this.exerciseService.remove(token, id, groupId);
  }
}
