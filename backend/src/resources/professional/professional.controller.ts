import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { UpdatePatientFromProfessionalDto } from './dto/update-patient-from-professional.dto';

@Controller('professional')
export class ProfessionalController {
  constructor(private readonly professionalService: ProfessionalService) {}

  // Create new professional
  @Post()
  create(@Body() createProfessionalDto: CreateProfessionalDto) {
    return this.professionalService.create(createProfessionalDto);
  }

  //Get professional info, populated with patients _id, name and profilePicture
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.professionalService.findOne(+id);
  }

  //Update professional info
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProfessionalDto: UpdateProfessionalDto,
  ) {
    return this.professionalService.update(+id, updateProfessionalDto);
  }

  //Add patient to professional list
  /* @Post(':id/patients')
  addPatient(@Param('id') id: string, @Body() patientEmail: string) {
    return this.professionalService.addPatientToProfessional(
      +id,
      +patientEmail,
    );
  } */

  //Get full info of patient
  /*  @Get(':id/patients/:patientId')
  findPatient(@Param('id') id: string, @Param('patientId') patientId: string) {
    return this.professionalService.findPatientFromProfessional(
      +id,
      +patientId,
    );
  } */

  //Update extraData of patient
  /* @Patch(':id/patients/:patientId')
  updatePatient(
    @Param('id') id: string,
    @Param('patientId') patientId: string,
    @Body() updatePatientFromProfessionalDto: UpdatePatientFromProfessionalDto,
  ) {
    return this.professionalService.updatePatientFromProfessional(
      +id,
      +patientId,
      updatePatientFromProfessionalDto,
    );
  } */

  //Delete patient from professional list
  /* @Delete(':id/patients/:patientId')
  removePatient(
    @Param('id') id: string,
    @Param('patientId') patientId: string,
  ) {
    return this.professionalService.removePatientFromProfessional(
      +id,
      +patientId,
    );
  } */
}
