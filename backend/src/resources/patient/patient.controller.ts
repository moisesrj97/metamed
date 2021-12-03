import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseInterceptors,
  UploadedFile,
  Headers,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import CreatePatientDto from './dto/createPatient.dto';
import UpdatePatientDto from './dto/updatePatient.dto';
import { PatientService } from './patient.service';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @UseInterceptors(FileInterceptor('profilePicture'))
  create(
    @Body() createPatientDto: CreatePatientDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.patientService.create(createPatientDto, file);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Headers('authorization') token: string) {
    return this.patientService.findOne(id, token);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id') id: string,
    @Body() updatePatientDto: UpdatePatientDto,
    @Headers('authorization') token: string,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.patientService.update(id, updatePatientDto, token, file);
  }
}
