import * as mongoose from 'mongoose';

export class ChatEntity {
  professional: mongoose.Types.ObjectId;
  patient: mongoose.Types.ObjectId;
  messages: [];
  constructor(
    professional: mongoose.Types.ObjectId,
    patient: mongoose.Types.ObjectId,
  ) {
    this.professional = professional;
    this.patient = patient;
    this.messages = [];
  }
}
