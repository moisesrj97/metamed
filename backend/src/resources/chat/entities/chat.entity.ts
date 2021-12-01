import * as mongoose from 'mongoose';

export class Chat {
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
