import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Patient, PatientSchema } from '../patient/patient.schema';
import {
  Professional,
  ProfessionalSchema,
} from '../professional/professional.schema';
import { Note, NoteSchema } from './note.schema';

@Module({
  controllers: [NoteController],
  providers: [NoteService],
  imports: [
    MongooseModule.forFeature([
      { name: Professional.name, schema: ProfessionalSchema },
      { name: Patient.name, schema: PatientSchema },
      { name: Note.name, schema: NoteSchema },
    ]),
  ],
})
export class NoteModule {}
