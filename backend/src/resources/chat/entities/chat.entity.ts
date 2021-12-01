import * as mongoose from 'mongoose';
import { MessageEntity } from 'src/resources/message/entities/message.entity';

export class ChatEntity {
  professional: mongoose.Types.ObjectId;
  patient: mongoose.Types.ObjectId;
  messages: MessageEntity[];
  constructor(
    professional: mongoose.Types.ObjectId,
    patient: mongoose.Types.ObjectId,
  ) {
    this.professional = professional;
    this.patient = patient;
    this.messages = [];
  }
}
