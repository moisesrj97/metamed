import * as mongoose from 'mongoose';
export class ExerciseGroup {
  author: mongoose.Types.ObjectId;
  name: string;
  extra: string;
  exercises: mongoose.Types.ObjectId[];
}
