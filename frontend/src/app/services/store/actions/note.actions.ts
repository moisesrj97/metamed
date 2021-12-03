import { createAction, props } from '@ngrx/store';

export const addNote = createAction(
  '[Note] Add Meal Group',
  props<{ noteId: string; patientId: string }>()
);

export const deleteNote = createAction(
  '[Note] Delete Meal Group',
  props<{ noteId: string; patientId: string }>()
);
