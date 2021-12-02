import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Professional } from '../professional/professional.schema';
import { Exercise } from '../exercise/exercise.schema';

export type ExerciseGroupDocument = ExerciseGroup & Document;

@Schema()
export class ExerciseGroup {
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
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }],
    required: true,
    default: [],
  })
  exercises: Exercise[];
}

export const ExerciseGroupSchema = SchemaFactory.createForClass(ExerciseGroup);
