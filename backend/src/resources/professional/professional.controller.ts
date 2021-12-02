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
import { ProfessionalService } from './professional.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ExtraDataItem } from './professional.schema';
import CreateProfessionalDto from './dto/createProfessional.dto';
import UpdateProfessionalDto from './dto/updateProfessional.dto';

@Controller('professional')
export class ProfessionalController {
  constructor(private readonly professionalService: ProfessionalService) {}

  // Create new professional
  @Post()
  @UseInterceptors(FileInterceptor('profilePicture'))
  create(
    @Body() createProfessionalDto: CreateProfessionalDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.professionalService.create(createProfessionalDto, file);
  }

  //Get professional info, populated with patients _id, name and profilePicture
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.professionalService.findOne(id);
  }

  //Update professional info
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id') id: string,
    @Body() updateProfessionalDto: UpdateProfessionalDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.professionalService.update(id, updateProfessionalDto, file);
  }

  //Add patient to professional list
  @Post(':id/patients')
  addPatient(@Param('id') id: string, @Body('patientId') patientId: string) {
    return this.professionalService.addPatientToProfessional(id, patientId);
  }

  //Update extraData of patient
  @Patch(':id/patients/:patientId')
  updatePatient(
    @Param('id') id: string,
    @Param('patientId') patientId: string,
    @Body('allExtraDataUpdated') allExtraDataUpdated: ExtraDataItem[],
  ) {
    return this.professionalService.updatePatientFromProfessional(
      id,
      patientId,
      allExtraDataUpdated,
    );
  }

  //Delete patient from professional list
  @Delete(':id/patients/:patientId')
  removePatient(
    @Param('id') id: string,
    @Param('patientId') patientId: string,
  ) {
    return this.professionalService.removePatientFromProfessional(
      id,
      patientId,
    );
  }
}
