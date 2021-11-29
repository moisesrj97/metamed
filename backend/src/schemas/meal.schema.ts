import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Professional } from './professional.schema';

export type MealDocument = Meal & Document;

@Schema()
export class Meal {
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
}

export const MealSchema = SchemaFactory.createForClass(Meal);
