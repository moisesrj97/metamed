import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Patient, PatientSchema } from './patient.schema';
import { S3ImageService } from '../../services/s3-image-service/s3-image-service.service';
import { Chat, ChatSchema } from '../chat/chat.schema';
import { Message, MessageSchema } from '../message/message.schema';
import {
  Professional,
  ProfessionalSchema,
} from '../professional/professional.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Patient.name, schema: PatientSchema },
      { name: Professional.name, schema: ProfessionalSchema },
      { name: Chat.name, schema: ChatSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  controllers: [PatientController],
  providers: [PatientService, S3ImageService],
})
export class PatientModule {}
