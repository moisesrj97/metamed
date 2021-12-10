import { createReducer, on } from '@ngrx/store';
import { toggleDarkMode } from './actions/darkMode.actions';

export const initialState = { darkMode: false };

export const darkModeReducer = createReducer(
  initialState,
  on(toggleDarkMode, (state) => ({ darkMode: !state.darkMode }))
);
