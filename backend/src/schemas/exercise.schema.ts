import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Professional } from './professional.schema';

export type ExerciseDocument = Exercise & Document;

@Schema()
export class Exercise {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professional',
    required: true,
  })
  author: Professional;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  amount: string;

  @Prop({ required: false })
  image: string;
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);
