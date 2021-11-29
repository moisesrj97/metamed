import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Professional } from './professional.schema';
import { Patient } from './patient.schema';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'fromRole',
    required: true,
  })
  from: Professional | Patient;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'toRole',
    required: true,
  })
  to: Professional | Patient;

  @Prop({ required: true })
  text: string;

  @Prop({ required: true, default: false })
  read: boolean;

  @Prop({ required: true, enum: ['Patient', 'Professional'] })
  fromRole: string;

  @Prop({ required: true, enum: ['Patient', 'Professional'] })
  toRole: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
