import { createAction, props } from '@ngrx/store';

export const addExerciseGroup = createAction(
  '[ExerciseGroup] Add Exercise Group',
  props<{ exerciseGroupId: string; patientId: string }>()
);

export const deleteExerciseGroup = createAction(
  '[ExerciseGroup] Delete Exercise Group',
  props<{ exerciseGroupId: string; patientId: string }>()
);
