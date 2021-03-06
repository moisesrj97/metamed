import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Patient } from '../patient/patient.schema';
import { Chat } from '../chat/chat.schema';
import { ExerciseGroup } from '../exercise-group/exerciseGroup.schema';
import { MealGroup } from '../meal-group/mealGroup.schema';
import { Note } from '../note/note.schema';

export type ExtraDataItem = { key: string; value: string };

export type ProfessionalDocument = Professional & Document;

@Schema()
export class Professional {
  @Prop({ enum: ['Professional'], required: true, default: 'Professional' })
  role: string;

  @Prop({ required: true })
  profilePicture: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  surname: string;

  @Prop({ required: true })
  businessName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    type: [
      {
        refData: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Patient',
          required: true,
        },
        extraData: { type: [Object], required: false },
        chatRef: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Chat',
          required: true,
        },
        exerciseGroups: {
          type: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'ExerciseGroup' },
          ],
          required: true,
          default: [],
        },
        mealGroups: {
          type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MealGroup' }],
          required: true,
          default: [],
        },
        notes: {
          type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
          required: true,
          default: [],
        },
      },
    ],
    required: true,
    default: [],
  })
  patients: [
    {
      refData: Patient;
      extraData: [ExtraDataItem];
      chatRef: Chat;
      exerciseGroups: [ExerciseGroup];
      mealGroups: [MealGroup];
      notes: [Note];
    },
  ];
}

export const ProfessionalSchema = SchemaFactory.createForClass(Professional);
