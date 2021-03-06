import { Module } from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { ProfessionalController } from './professional.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Professional, ProfessionalSchema } from './professional.schema';
import { S3ImageService } from '../../services/s3-image-service/s3-image-service.service';
import { Patient, PatientSchema } from '../patient/patient.schema';
import { Chat, ChatSchema } from '../chat/chat.schema';
import { Message, MessageSchema } from '../message/message.schema';
import {
  ExerciseGroup,
  ExerciseGroupSchema,
} from '../exercise-group/exerciseGroup.schema';
import { MealGroup, MealGroupSchema } from '../meal-group/mealGroup.schema';
import { Note, NoteSchema } from '../note/note.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Professional.name, schema: ProfessionalSchema },
      { name: Patient.name, schema: PatientSchema },
      { name: Chat.name, schema: ChatSchema },
      { name: Message.name, schema: MessageSchema },
      { name: ExerciseGroup.name, schema: ExerciseGroupSchema },
      { name: MealGroup.name, schema: MealGroupSchema },
      { name: Note.name, schema: NoteSchema },
    ]),
  ],
  controllers: [ProfessionalController],
  providers: [ProfessionalService, S3ImageService],
})
export class ProfessionalModule {}
