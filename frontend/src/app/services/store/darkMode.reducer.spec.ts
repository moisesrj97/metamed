import * as fromReducer from './darkMode.reducer';
import {
  loginUser,
  logoutUser,
  updateUserBasicData,
  updatePatientExtraDataFromProfessional,
  deleteUserFromProfessional,
} from './actions/user.actions';
import {
  deleteExerciseGroup,
  addExerciseGroup,
} from './actions/exerciseGroup.actions';
import { addMealGroup, deleteMealGroup } from './actions/mealGroup.action';
import { UserStore } from 'src/app/models/interfaces';
import { addNote, deleteNote } from './actions/note.actions';
import {
  addMessageToChat,
  updateMessageReadState,
} from './actions/chat.actions';
import { toggleDarkMode } from './actions/darkMode.actions';

describe('Given DarkModeReducer', () => {
  describe('When unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {
        type: 'Unknown',
      };
      const state = fromReducer.darkModeReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('When toggle action', () => {
    it('should load the state without altering the token', () => {
      const { initialState } = fromReducer;
      const newState = {
        darkMode: true,
      };
      const action = toggleDarkMode();
      const state = fromReducer.darkModeReducer(initialState, action);

      expect(state).toEqual(newState);
    });
  });
});
