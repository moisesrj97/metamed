import { createAction, props } from '@ngrx/store';

export const addMealGroup = createAction(
  '[MealGroup] Add Meal Group',
  props<{ mealGroupId: string; patientId: string }>()
);

export const deleteMealGroup = createAction(
  '[MealGroup] Delete Meal Group',
  props<{ mealGroupId: string; patientId: string }>()
);
