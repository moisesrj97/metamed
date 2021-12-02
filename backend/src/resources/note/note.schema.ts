import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Professional } from '../professional/professional.schema';

export type NoteDocument = Note & Document;

@Schema()
export class Note {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professional',
    required: true,
  })
  author: Professional;

  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description: string;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
