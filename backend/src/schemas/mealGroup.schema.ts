import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Professional } from '../resources/professional/professional.schema';
import { Meal } from './meal.schema';

export type MealGroupDocument = MealGroup & Document;

@Schema()
export class MealGroup {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professional',
    required: true,
  })
  author: Professional;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  extra: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meal' }],
    required: true,
    default: [],
  })
  meals: Meal[];
}

export const MealGroupSchema = SchemaFactory.createForClass(MealGroup);
