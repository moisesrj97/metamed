import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PatientService } from './patient.service';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @UseInterceptors(FileInterceptor('profilePicture'))
  create(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('surname') surname: string,
    @Body('gender') gender: string,
    @Body('birthDate') birthDate: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.patientService.create(
      name,
      email,
      password,
      surname,
      gender,
      birthDate,
      file,
    );
  }

  @Get()
  findAll() {
    return this.patientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.patientService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientService.remove(id);
  }
}
