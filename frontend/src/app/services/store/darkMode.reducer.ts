import { createReducer, on } from '@ngrx/store';
import { toggleDarkMode } from './actions/darkMode.actions';

export const darkModeReducer = createReducer(
  { darkMode: false },
  on(toggleDarkMode, (state) => ({ darkMode: !state.darkMode }))
);
