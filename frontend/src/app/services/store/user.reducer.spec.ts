import * as fromReducer from './user.reducer';
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

describe('Given UserReducer', () => {
  describe('When unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {
        type: 'Unknown',
      };
      const state = fromReducer.userReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('When loginUser action', () => {
    it('should load the state without altering the token', () => {
      const { initialState } = fromReducer;
      const newState: UserStore = {
        _id: '5e9f8f8f8f8f8f8f8f8f8f8',
        name: 'John Doe',
        surname: 'Doe',
        email: 'fake@test.com',
        role: 'Professional',
        profilePicture: 'test.jpg',
        businessName: 'test',
        patients: [],
      };
      const action = loginUser({
        userInfo: {
          _id: '5e9f8f8f8f8f8f8f8f8f8f8',
          name: 'John Doe',
          surname: 'Doe',
          email: 'fake@test.com',
          role: 'Professional',
          profilePicture: 'test.jpg',
          businessName: 'test',
          patients: [],
        },
      });
      const state = fromReducer.userReducer(initialState, action);

      expect(state).toEqual(newState);
    });
  });

  describe('When logoutUser action', () => {
    it('should load the initial state', () => {
      const { initialState } = fromReducer;
      const newState: UserStore = {
        ...initialState,
      };
      const action = logoutUser();
      const state = fromReducer.userReducer(initialState, action);

      expect(state).toEqual(newState);
    });
  });

  describe('When updateUserBasicData action', () => {
    it('should update user basic data', () => {
      const initialState: UserStore = {
        _id: '5e9f8f8f8f8f8f8f8f8f8f8',
        name: 'John Doe',
        surname: 'Doe',
        email: 'fake@test.com',
        role: 'Professional',
        profilePicture: 'test.jpg',
        businessName: 'test',
        patients: [],
      };

      const newState: UserStore = {
        _id: '5e9f8f8f8f8f8f8f8f8f8f8',
        name: 'John Doe Changed',
        surname: 'Doey',
        email: 'fake@test.com',
        role: 'Professional',
        profilePicture: 'test.jpg',
        businessName: 'test',
        patients: [],
      };

      const action = updateUserBasicData({
        fullDataUpdated: {
          name: 'John Doe Changed',
          surname: 'Doey',
          profilePicture: 'test.jpg',
          businessName: 'test',
        },
      });
      const state = fromReducer.userReducer(initialState, action);

      expect(state).toEqual(newState);
    });
  });

  describe('When updatePatientExtraDataFromProfessional action', () => {
    it('should update patient extra data', () => {
      const initialState: UserStore = {
        _id: '5e9f8f8f8f8f8f8f8f8f8f8',
        name: 'John Doe',
        surname: 'Doe',
        email: 'fake@test.com',
        role: 'Professional',
        profilePicture: 'test.jpg',
        businessName: 'test',
        patients: [
          {
            refData: {
              _id: 'f8f8f8f8f8f8',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },
            extraData: [],
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [],
            },
            exerciseGroups: [],
            mealGroups: [],
            notes: [],
          },
          {
            refData: {
              _id: 'f9f9f9f9f9f9',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },
            extraData: [],
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [],
            },
            exerciseGroups: [],
            mealGroups: [],
            notes: [],
          },
        ],
      };

      const newState: UserStore = {
        _id: '5e9f8f8f8f8f8f8f8f8f8f8',
        name: 'John Doe',
        surname: 'Doe',
        email: 'fake@test.com',
        role: 'Professional',
        profilePicture: 'test.jpg',
        businessName: 'test',
        patients: [
          {
            refData: {
              _id: 'f8f8f8f8f8f8',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },
            extraData: [{ key: 'test', value: 'test' }],
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [],
            },
            exerciseGroups: [],
            mealGroups: [],
            notes: [],
          },
          {
            refData: {
              _id: 'f9f9f9f9f9f9',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },
            extraData: [],
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [],
            },
            exerciseGroups: [],
            mealGroups: [],
            notes: [],
          },
        ],
      };

      const action = updatePatientExtraDataFromProfessional({
        fullExtraDataUpdated: [{ key: 'test', value: 'test' }],
        patientId: 'f8f8f8f8f8f8',
      });
      const state = fromReducer.userReducer(initialState, action);

      expect(state).toEqual(newState);
    });
  });
  describe('When deleteUserFromProfessional action', () => {
    it('should remove patient from professional list', () => {
      const initialState: UserStore = {
        _id: '5e9f8f8f8f8f8f8f8f8f8f8',
        name: 'John Doe',
        surname: 'Doe',
        email: 'fake@test.com',
        role: 'Professional',
        profilePicture: 'test.jpg',
        businessName: 'test',
        patients: [
          {
            refData: {
              _id: 'f8f8f8f8f8f8',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },
            extraData: [],
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [],
            },
            exerciseGroups: [],
            mealGroups: [],
            notes: [],
          },
          {
            refData: {
              _id: 'f9f9f9f9f9f9',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },
            extraData: [],
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [],
            },
            exerciseGroups: [],
            mealGroups: [],
            notes: [],
          },
        ],
      };

      const newState: UserStore = {
        _id: '5e9f8f8f8f8f8f8f8f8f8f8',
        name: 'John Doe',
        surname: 'Doe',
        email: 'fake@test.com',
        role: 'Professional',
        profilePicture: 'test.jpg',
        businessName: 'test',
        patients: [
          {
            refData: {
              _id: 'f9f9f9f9f9f9',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },
            extraData: [],
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [],
            },
            exerciseGroups: [],
            mealGroups: [],
            notes: [],
          },
        ],
      };

      const action = deleteUserFromProfessional({
        patientId: 'f8f8f8f8f8f8',
      });
      const state = fromReducer.userReducer(initialState, action);

      expect(state).toEqual(newState);
    });
  });

  describe('When addExerciseGroup action', () => {
    it('should add exercise group to patient', () => {
      const initialState: UserStore = {
        _id: '5e9f8f8f8f8f8f8f8f8f8f8',
        name: 'John Doe',
        surname: 'Doe',
        email: 'fake@test.com',
        role: 'Professional',
        profilePicture: 'test.jpg',
        businessName: 'test',
        patients: [
          {
            refData: {
              _id: 'f8f8f8f8f8f8',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },
            extraData: [],
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [],
            },
            exerciseGroups: [],
            mealGroups: [],
            notes: [],
          },
          {
            refData: {
              _id: 'f9f9f9f9f9f9',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },
            extraData: [],
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [],
            },
            exerciseGroups: [],
            mealGroups: [],
            notes: [],
          },
        ],
      };

      const newState: UserStore = {
        _id: '5e9f8f8f8f8f8f8f8f8f8f8',
        name: 'John Doe',
        surname: 'Doe',
        email: 'fake@test.com',
        role: 'Professional',
        profilePicture: 'test.jpg',
        businessName: 'test',
        patients: [
          {
            refData: {
              _id: 'f8f8f8f8f8f8',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },
            extraData: [],
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [],
            },
            exerciseGroups: ['f9f9f9f9f9f9'],
            mealGroups: [],
            notes: [],
          },
          {
            refData: {
              _id: 'f9f9f9f9f9f9',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },
            extraData: [],
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [],
            },
            exerciseGroups: [],
            mealGroups: [],
            notes: [],
          },
        ],
      };

      const action = addExerciseGroup({
        patientId: 'f8f8f8f8f8f8',
        exerciseGroupId: 'f9f9f9f9f9f9',
      });
      const state = fromReducer.userReducer(initialState, action);

      expect(state).toEqual(newState);
    });
  });

  describe('When deleteExerciseGroup action', () => {
    it('should delete exercise group from patient', () => {
      const initialState: UserStore = {
        _id: '5e9f8f8f8f8f8f8f8f8f8f8',
        name: 'John Doe',
        surname: 'Doe',
        email: 'fake@test.com',
        role: 'Professional',
        profilePicture: 'test.jpg',
        businessName: 'test',
        patients: [
          {
            refData: {
              _id: 'f8f8f8f8f8f8',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },
            extraData: [],
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [],
            },
            exerciseGroups: ['f9f9f9f9f9f9', 'f9f9f9f9f9f0'],
            mealGroups: [],
            notes: [],
          },
          {
            refData: {
              _id: 'f9f9f9f9f9f9',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },
            extraData: [],
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [],
            },
            exerciseGroups: [],
            mealGroups: [],
            notes: [],
          },
        ],
      };

      const newState: UserStore = {
        _id: '5e9f8f8f8f8f8f8f8f8f8f8',
        name: 'John Doe',
        surname: 'Doe',
        email: 'fake@test.com',
        role: 'Professional',
        profilePicture: 'test.jpg',
        businessName: 'test',
        patients: [
          {
            refData: {
              _id: 'f8f8f8f8f8f8',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },
            extraData: [],
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [],
            },
            exerciseGroups: ['f9f9f9f9f9f0'],
            mealGroups: [],
            notes: [],
          },
          {
            refData: {
              _id: 'f9f9f9f9f9f9',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },
            extraData: [],
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [],
            },
            exerciseGroups: [],
            mealGroups: [],
            notes: [],
          },
        ],
      };

      const action = deleteExerciseGroup({
        patientId: 'f8f8f8f8f8f8',
        exerciseGroupId: 'f9f9f9f9f9f9',
      });
      const state = fromReducer.userReducer(initialState, action);

      expect(state).toEqual(newState);
    });
  });

  describe('When addMealGroup action', () => {
    it('should add meal group to patient', () => {
      const initialState: UserStore = {
        _id: '5e9f8f8f8f8f8f8f8f8f8f8',
        name: 'John Doe',
        surname: 'Doe',
        email: 'fake@test.com',
        role: 'Professional',
        profilePicture: 'test.jpg',
        businessName: 'test',
        patients: [
          {
            refData: {
              _id: 'f8f8f8f8f8f8',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },
            extraData: [],
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [],
            },
            exerciseGroups: [],
            mealGroups: [],
            notes: [],
          },
          {
            refData: {
              _id: 'f9f9f9f9f9f9',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },
            extraData: [],
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [],
            },
            exerciseGroups: [],
            mealGroups: [],
            notes: [],
          },
        ],
      };

      const newState: UserStore = {
        _id: '5e9f8f8f8f8f8f8f8f8f8f8',
        name: 'John Doe',
        surname: 'Doe',
        email: 'fake@test.com',
        role: 'Professional',
        profilePicture: 'test.jpg',
        businessName: 'test',
        patients: [
          {
            refData: {
              _id: 'f8f8f8f8f8f8',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },
            extraData: [],
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [],
            },
            exerciseGroups: [],
            mealGroups: ['f9f9f9f9f9f9'],
            notes: [],
          },
          {
            refData: {
              _id: 'f9f9f9f9f9f9',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },
            extraData: [],
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [],
            },
            exerciseGroups: [],
            mealGroups: [],
            notes: [],
          },
        ],
      };

      const action = addMealGroup({
        patientId: 'f8f8f8f8f8f8',
        mealGroupId: 'f9f9f9f9f9f9',
      });
      const state = fromReducer.userReducer(initialState, action);

      expect(state).toEqual(newState);
    });
  });

  describe('When deleteMealGroup action', () => {
    it('should delete exercise group from patient', () => {
      const initialState: UserStore = {
        _id: '5e9f8f8f8f8f8f8f8f8f8f8',
        name: 'John Doe',
        surname: 'Doe',
        email: 'fake@test.com',
        role: 'Professional',
        profilePicture: 'test.jpg',
        businessName: 'test',
        patients: [
          {
            refData: {
              _id: 'f8f8f8f8f8f8',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },
            extraData: [],
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [],
            },
            exerciseGroups: [],
            mealGroups: ['f9f9f9f9f9f9', 'f9f9f9f9f9f0'],
            notes: [],
          },
          {
            refData: {
              _id: 'f9f9f9f9f9f9',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },
            extraData: [],
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [],
            },
            exerciseGroups: [],
            mealGroups: [],
            notes: [],
          },
        ],
      };

      const newState: UserStore = {
        _id: '5e9f8f8f8f8f8f8f8f8f8f8',
        name: 'John Doe',
        surname: 'Doe',
        email: 'fake@test.com',
        role: 'Professional',
        profilePicture: 'test.jpg',
        businessName: 'test',
        patients: [
          {
            refData: {
              _id: 'f8f8f8f8f8f8',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },
            extraData: [],
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [],
            },
            exerciseGroups: [],
            mealGroups: ['f9f9f9f9f9f0'],
            notes: [],
          },
          {
            refData: {
              _id: 'f9f9f9f9f9f9',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },
            extraData: [],
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [],
            },
            exerciseGroups: [],
            mealGroups: [],
            notes: [],
          },
        ],
      };

      const action = deleteMealGroup({
        patientId: 'f8f8f8f8f8f8',
        mealGroupId: 'f9f9f9f9f9f9',
      });
      const state = fromReducer.userReducer(initialState, action);

      expect(state).toEqual(newState);
    });
  });

  describe('When addNote action', () => {
    it('should add note to patient', () => {
      const initialState: UserStore = {
        _id: '5e9f8f8f8f8f8f8f8f8f8f8',
        name: 'John Doe',
        surname: 'Doe',
        email: 'fake@test.com',
        role: 'Professional',
        profilePicture: 'test.jpg',
        businessName: 'test',
        patients: [
          {
            refData: {
              _id: 'f8f8f8f8f8f8',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },
            extraData: [],
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [],
            },
            exerciseGroups: [],
            mealGroups: [],
            notes: [],
          },
          {
            refData: {
              _id: 'f9f9f9f9f9f9',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },
            extraData: [],
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [],
            },
            exerciseGroups: [],
            mealGroups: [],
            notes: [],
          },
        ],
      };

      const newState: UserStore = {
        _id: '5e9f8f8f8f8f8f8f8f8f8f8',
        name: 'John Doe',
        surname: 'Doe',
        email: 'fake@test.com',
        role: 'Professional',
        profilePicture: 'test.jpg',
        businessName: 'test',
        patients: [
          {
            refData: {
              _id: 'f8f8f8f8f8f8',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },
            extraData: [],
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [],
            },
            exerciseGroups: [],
            mealGroups: [],
            notes: ['f9f9f9f9f9f9'],
          },
          {
            refData: {
              _id: 'f9f9f9f9f9f9',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },
            extraData: [],
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [],
            },
            exerciseGroups: [],
            mealGroups: [],
            notes: [],
          },
        ],
      };

      const action = addNote({
        patientId: 'f8f8f8f8f8f8',
        noteId: 'f9f9f9f9f9f9',
      });
      const state = fromReducer.userReducer(initialState, action);

      expect(state).toEqual(newState);
    });
  });

  describe('When deleteNote action', () => {
    it('should delete note from patient', () => {
      const initialState: UserStore = {
        _id: '5e9f8f8f8f8f8f8f8f8f8f8',
        name: 'John Doe',
        surname: 'Doe',
        email: 'fake@test.com',
        role: 'Professional',
        profilePicture: 'test.jpg',
        businessName: 'test',
        patients: [
          {
            refData: {
              _id: 'f8f8f8f8f8f8',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },
            extraData: [],
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [],
            },
            exerciseGroups: [],
            mealGroups: [],
            notes: ['f9f9f9f9f9f9', 'f9f9f9f9f9f0'],
          },
          {
            refData: {
              _id: 'f9f9f9f9f9f9',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },
            extraData: [],
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [],
            },
            exerciseGroups: [],
            mealGroups: [],
            notes: [],
          },
        ],
      };

      const newState: UserStore = {
        _id: '5e9f8f8f8f8f8f8f8f8f8f8',
        name: 'John Doe',
        surname: 'Doe',
        email: 'fake@test.com',
        role: 'Professional',
        profilePicture: 'test.jpg',
        businessName: 'test',
        patients: [
          {
            refData: {
              _id: 'f8f8f8f8f8f8',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },
            extraData: [],
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [],
            },
            exerciseGroups: [],
            mealGroups: [],
            notes: ['f9f9f9f9f9f0'],
          },
          {
            refData: {
              _id: 'f9f9f9f9f9f9',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },
            extraData: [],
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [],
            },
            exerciseGroups: [],
            mealGroups: [],
            notes: [],
          },
        ],
      };

      const action = deleteNote({
        patientId: 'f8f8f8f8f8f8',
        noteId: 'f9f9f9f9f9f9',
      });
      const state = fromReducer.userReducer(initialState, action);

      expect(state).toEqual(newState);
    });
  });
  describe('When addMessageToChat action from professional', () => {
    it('should add message to patient chat', () => {
      const initialState: UserStore = {
        _id: '5e9f8f8f8f8f8f8f8f8f8f8',
        name: 'John Doe',
        surname: 'Doe',
        email: 'fake@test.com',
        role: 'Professional',
        profilePicture: 'test.jpg',
        businessName: 'test',
        patients: [
          {
            refData: {
              _id: 'f8f8f8f8f8f8',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },
            extraData: [],
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [],
            },
            exerciseGroups: [],
            mealGroups: [],
            notes: [],
          },
          {
            refData: {
              _id: 'f9f9f9f9f9f9',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },
            extraData: [],
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [],
            },
            exerciseGroups: [],
            mealGroups: [],
            notes: [],
          },
        ],
      };

      const newState: UserStore = {
        _id: '5e9f8f8f8f8f8f8f8f8f8f8',
        name: 'John Doe',
        surname: 'Doe',
        email: 'fake@test.com',
        role: 'Professional',
        profilePicture: 'test.jpg',
        businessName: 'test',
        patients: [
          {
            refData: {
              _id: 'f8f8f8f8f8f8',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },
            extraData: [],
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [
                {
                  _id: 'f9f9f9f9f9f9',
                  to: 'f8f8f8f8f8f8',
                  from: '5e9f8f8f8f8f8f8f8f8f8f8',
                  text: 'test',
                  toRole: 'Patient',
                  fromRole: 'Professional',
                  read: false,
                },
              ],
            },
            exerciseGroups: [],
            mealGroups: [],
            notes: [],
          },
          {
            refData: {
              _id: 'f9f9f9f9f9f9',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },
            extraData: [],
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [],
            },
            exerciseGroups: [],
            mealGroups: [],
            notes: [],
          },
        ],
      };

      const action = addMessageToChat({
        message: {
          _id: 'f9f9f9f9f9f9',
          to: 'f8f8f8f8f8f8',
          from: '5e9f8f8f8f8f8f8f8f8f8f8',
          text: 'test',
          toRole: 'Patient',
          fromRole: 'Professional',
          read: false,
        },
      });
      const state = fromReducer.userReducer(initialState, action);

      expect(state).toEqual(newState);
    });
  });

  describe('When addMessageToChat action from patient', () => {
    it('should add message to patient chat', () => {
      const initialState: UserStore = {
        _id: '5e9f8f8f8f8f8f8f8f8f8f8',
        name: 'John Doe',
        surname: 'Doe',
        email: 'fake@test.com',
        role: 'Professional',
        profilePicture: 'test.jpg',
        gender: 'test',
        birthDate: 'test',
        professionals: [
          {
            refData: {
              _id: 'f8f8f8f8f8f8',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [],
            },
            exerciseGroups: [],
            mealGroups: [],
            notes: [],
          },
          {
            refData: {
              _id: 'f9f9f9f9f9f9',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [],
            },
            exerciseGroups: [],
            mealGroups: [],
            notes: [],
          },
        ],
      };

      const newState: UserStore = {
        _id: '5e9f8f8f8f8f8f8f8f8f8f8',
        name: 'John Doe',
        surname: 'Doe',
        email: 'fake@test.com',
        role: 'Professional',
        profilePicture: 'test.jpg',
        gender: 'test',
        birthDate: 'test',
        professionals: [
          {
            refData: {
              _id: 'f8f8f8f8f8f8',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [
                {
                  _id: 'f9f9f9f9f9f9',
                  to: 'f8f8f8f8f8f8',
                  from: '5e9f8f8f8f8f8f8f8f8f8f8',
                  text: 'test',
                  toRole: 'Professional',
                  fromRole: 'Patient',
                  read: false,
                },
              ],
            },
            exerciseGroups: [],
            mealGroups: [],
            notes: [],
          },
          {
            refData: {
              _id: 'f9f9f9f9f9f9',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [],
            },
            exerciseGroups: [],
            mealGroups: [],
            notes: [],
          },
        ],
      };

      const action = addMessageToChat({
        message: {
          _id: 'f9f9f9f9f9f9',
          to: 'f8f8f8f8f8f8',
          from: '5e9f8f8f8f8f8f8f8f8f8f8',
          text: 'test',
          toRole: 'Professional',
          fromRole: 'Patient',
          read: false,
        },
      });
      const state = fromReducer.userReducer(initialState, action);

      expect(state).toEqual(newState);
    });
  });

  describe('When updateMessageState action from professional', () => {
    it('should add message to patient chat', () => {
      const initialState: UserStore = {
        _id: '5e9f8f8f8f8f8f8f8f8f8f8',
        name: 'John Doe',
        surname: 'Doe',
        email: 'fake@test.com',
        role: 'Professional',
        profilePicture: 'test.jpg',
        businessName: 'test',
        professionals: [
          {
            refData: {
              _id: 'f8f8f8f8f8f8',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [
                {
                  _id: 'f9f9f9f9f9f9',
                  to: 'f8f8f8f8f8f8',
                  from: '5e9f8f8f8f8f8f8f8f8f8f8',
                  text: 'test',
                  toRole: 'Patient',
                  fromRole: 'Professional',
                  read: false,
                },
                {
                  _id: 'f9f9f9f9f9f1',
                  to: 'f8f8f8f8f8f8',
                  from: '5e9f8f8f8f8f8f8f8f8f8f8',
                  text: 'test',
                  toRole: 'Patient',
                  fromRole: 'Professional',
                  read: false,
                },
              ],
            },
            exerciseGroups: [],
            mealGroups: [],
            notes: [],
          },
          {
            refData: {
              _id: 'f9f9f9f9f9f9',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [],
            },
            exerciseGroups: [],
            mealGroups: [],
            notes: [],
          },
        ],
      };

      const newState: UserStore = {
        _id: '5e9f8f8f8f8f8f8f8f8f8f8',
        name: 'John Doe',
        surname: 'Doe',
        email: 'fake@test.com',
        role: 'Professional',
        profilePicture: 'test.jpg',
        businessName: 'test',
        professionals: [
          {
            refData: {
              _id: 'f8f8f8f8f8f8',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [
                {
                  _id: 'f9f9f9f9f9f9',
                  to: 'f8f8f8f8f8f8',
                  from: '5e9f8f8f8f8f8f8f8f8f8f8',
                  text: 'test',
                  toRole: 'Patient',
                  fromRole: 'Professional',
                  read: true,
                },
                {
                  _id: 'f9f9f9f9f9f1',
                  to: 'f8f8f8f8f8f8',
                  from: '5e9f8f8f8f8f8f8f8f8f8f8',
                  text: 'test',
                  toRole: 'Patient',
                  fromRole: 'Professional',
                  read: false,
                },
              ],
            },
            exerciseGroups: [],
            mealGroups: [],
            notes: [],
          },
          {
            refData: {
              _id: 'f9f9f9f9f9f9',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [],
            },
            exerciseGroups: [],
            mealGroups: [],
            notes: [],
          },
        ],
      };

      const action = updateMessageReadState({
        message: {
          _id: 'f9f9f9f9f9f9',
          to: '5e9f8f8f8f8f8f8f8f8f8f8',
          from: 'f8f8f8f8f8f8',
          text: 'test',
          toRole: 'Patient',
          fromRole: 'Professional',
          read: false,
        },
      });
      const state = fromReducer.userReducer(initialState, action);
      expect(state).toEqual(newState);
    });
  });

  describe('When updateMessageState action from patient', () => {
    it('should add message to patient chat', () => {
      const initialState: UserStore = {
        _id: '5e9f8f8f8f8f8f8f8f8f8f8',
        name: 'John Doe',
        surname: 'Doe',
        email: 'fake@test.com',
        role: 'Professional',
        profilePicture: 'test.jpg',
        gender: 'test',
        birthDate: 'test',
        patients: [
          {
            refData: {
              _id: 'f8f8f8f8f8f8',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },
            extraData: [],
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [
                {
                  _id: 'f9f9f9f9f9f9',
                  to: 'f8f8f8f8f8f8',
                  from: '5e9f8f8f8f8f8f8f8f8f8f8',
                  text: 'test',
                  toRole: 'Patient',
                  fromRole: 'Professional',
                  read: false,
                },
                {
                  _id: 'f9f9f9f9f9f1',
                  to: 'f8f8f8f8f8f8',
                  from: '5e9f8f8f8f8f8f8f8f8f8f8',
                  text: 'test',
                  toRole: 'Patient',
                  fromRole: 'Professional',
                  read: false,
                },
              ],
            },
            exerciseGroups: [],
            mealGroups: [],
            notes: [],
          },
          {
            refData: {
              _id: 'f9f9f9f9f9f9',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },

            extraData: [],
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [],
            },
            exerciseGroups: [],
            mealGroups: [],
            notes: [],
          },
        ],
      };

      const newState: UserStore = {
        _id: '5e9f8f8f8f8f8f8f8f8f8f8',
        name: 'John Doe',
        surname: 'Doe',
        email: 'fake@test.com',
        role: 'Professional',
        profilePicture: 'test.jpg',
        gender: 'test',
        birthDate: 'test',
        patients: [
          {
            refData: {
              _id: 'f8f8f8f8f8f8',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },

            extraData: [],
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [
                {
                  _id: 'f9f9f9f9f9f9',
                  to: 'f8f8f8f8f8f8',
                  from: '5e9f8f8f8f8f8f8f8f8f8f8',
                  text: 'test',
                  toRole: 'Patient',
                  fromRole: 'Professional',
                  read: true,
                },
                {
                  _id: 'f9f9f9f9f9f1',
                  to: 'f8f8f8f8f8f8',
                  from: '5e9f8f8f8f8f8f8f8f8f8f8',
                  text: 'test',
                  toRole: 'Patient',
                  fromRole: 'Professional',
                  read: false,
                },
              ],
            },
            exerciseGroups: [],
            mealGroups: [],
            notes: [],
          },
          {
            refData: {
              _id: 'f9f9f9f9f9f9',
              name: 'John Doe',
              surname: 'Doe',
              profilePicture: 'test.jpg',
            },

            extraData: [],
            chatRef: {
              _id: '5e9f8f8f8f8f8f8f8f8f8f8',
              patient: '5e9f8f8f8f8f8f8f8f8f8f8',
              professional: '5e9f8f8f8f8f8f8f8f8f8f8',
              messages: [],
            },
            exerciseGroups: [],
            mealGroups: [],
            notes: [],
          },
        ],
      };

      const action = updateMessageReadState({
        message: {
          _id: 'f9f9f9f9f9f9',
          to: '5e9f8f8f8f8f8f8f8f8f8f8',
          from: 'f8f8f8f8f8f8',
          text: 'test',
          toRole: 'Professional',
          fromRole: 'Patient',
          read: false,
        },
      });
      const state = fromReducer.userReducer(initialState, action);

      expect(state).toEqual(newState);
    });
  });
});
