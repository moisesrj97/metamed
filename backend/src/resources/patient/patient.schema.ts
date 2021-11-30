import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Professional } from '../professional/professional.schema';
import { Chat } from '../../schemas/chat.schema';

export type PatientDocument = Patient & Document;

@Schema()
export class Patient {
  @Prop({ enum: ['Patient'], required: true, default: 'Patient' })
  role: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  profilePicture: string;

  @Prop({ required: false })
  surname: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  birthDate: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    type: [
      {
        refData: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Professional',
          required: true,
        },
        chatRef: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Chat',
          required: true,
        },
      },
    ],
    required: true,
    default: [],
  })
  professionals: [
    {
      refData: Professional;
      chatRef: Chat;
    },
  ];
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
