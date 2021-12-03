import { createReducer, on } from '@ngrx/store';
import {
  PatientModel,
  ProfessionalModel,
  UserStore,
} from 'src/app/models/interfaces';
import {
  addMessageToChat,
  updateMessageReadState,
} from './actions/chat.actions';
import {
  addExerciseGroup,
  deleteExerciseGroup,
} from './actions/exerciseGroup.actions';
import { addMealGroup, deleteMealGroup } from './actions/mealGroup.action';
import { addNote, deleteNote } from './actions/note.actions';
import {
  deleteUserFromProfessional,
  loadToken,
  loginUser,
  logoutUser,
  updatePatientExtraDataFromProfessional,
  updateUserBasicData,
} from './actions/user.actions';

const initialState: UserStore = {
  token: '',
  _id: '',
  name: '',
  surname: '',
  email: '',
  profilePicture: '',
  role: '',
};

export const userReducer = createReducer(
  initialState,
  on(loadToken, (state: UserStore, { token }) => ({
    ...state,
    token,
  })),
  on(loginUser, (state: UserStore, { userInfo }) => {
    const { token, ...user } = userInfo;
    return {
      ...state,
      ...user,
    };
  }),
  on(logoutUser, (state: UserStore) => ({ ...initialState })),
  on(updateUserBasicData, (state: UserStore, { fullDataUpdated }) => ({
    ...state,
    ...fullDataUpdated,
  })),
  //
  on(
    updatePatientExtraDataFromProfessional,
    (state: UserStore, { fullExtraDataUpdated, patientId }) => ({
      ...state,
      patients: state.patients?.map((patient) => {
        if (patient.refData._id === patientId) {
          return {
            ...patient,
            ...fullExtraDataUpdated,
          };
        }
        return patient;
      }),
    })
  ),
  on(deleteUserFromProfessional, (state: UserStore, { patientId }) => ({
    ...state,
    patients: state.patients?.filter(
      (patient) => patient.refData._id !== patientId
    ),
  })),
  //
  on(addExerciseGroup, (state: UserStore, { exerciseGroupId, patientId }) => ({
    ...state,
    patients: state.patients?.map((patient) => {
      if (patient.refData._id === patientId) {
        return {
          ...patient,
          exerciseGroups: [...patient.exerciseGroups, exerciseGroupId],
        };
      }
      return patient;
    }),
  })),
  on(
    deleteExerciseGroup,
    (state: UserStore, { patientId, exerciseGroupId }) => ({
      ...state,
      patients: state.patients?.map((patient) => {
        if (patient.refData._id === patientId) {
          return {
            ...patient,
            exerciseGroups: patient.exerciseGroups?.filter(
              (exerciseGroup) => exerciseGroup !== exerciseGroupId
            ),
          };
        }
        return patient;
      }),
    })
  ),
  //
  on(addMealGroup, (state: UserStore, { mealGroupId, patientId }) => ({
    ...state,
    patients: state.patients?.map((patient) => {
      if (patient.refData._id === patientId) {
        return {
          ...patient,
          mealGroups: [...patient.mealGroups, mealGroupId],
        };
      }
      return patient;
    }),
  })),
  on(deleteMealGroup, (state: UserStore, { patientId, mealGroupId }) => ({
    ...state,
    patients: state.patients?.map((patient) => {
      if (patient.refData._id === patientId) {
        return {
          ...patient,
          mealGroups: patient.mealGroups?.filter(
            (mealGroup) => mealGroup !== mealGroupId
          ),
        };
      }
      return patient;
    }),
  })),
  //
  on(addNote, (state: UserStore, { patientId, noteId }) => ({
    ...state,
    patients: state.patients?.map((patient) => {
      if (patient.refData._id === patientId) {
        return {
          ...patient,
          notes: [...patient.notes, noteId],
        };
      }
      return patient;
    }),
  })),
  on(deleteNote, (state: UserStore, { noteId, patientId }) => ({
    ...state,
    patients: state.patients?.map((patient) => {
      if (patient.refData._id === patientId) {
        return {
          ...patient,
          notes: patient.notes?.filter((note) => note !== noteId),
        };
      }
      return patient;
    }),
  })),
  //
  on(addMessageToChat, (state: UserStore, { message }) => {
    const recipient =
      message.toRole === 'Patient' ? 'patients' : 'professionals';

    return {
      ...state,
      [recipient]: state[recipient]?.map(
        (otherUser: ProfessionalModel | PatientModel) => {
          if (otherUser.refData._id === message.to) {
            return {
              ...otherUser,
              chat: (otherUser.chatRef.messages = [
                ...otherUser.chatRef.messages,
                message,
              ]),
            };
          }
          return otherUser;
        }
      ),
    };
  }),
  on(updateMessageReadState, (state: UserStore, { message }) => {
    const recipient =
      message.toRole === 'Patient' ? 'patients' : 'professionals';

    return {
      ...state,
      [recipient]: state[recipient]?.map(
        (otherUser: ProfessionalModel | PatientModel) => {
          if (otherUser.refData._id === message.to) {
            return {
              ...otherUser,
              chat: (otherUser.chatRef.messages =
                otherUser.chatRef.messages.map((message) => {
                  if (message._id === message._id) {
                    return {
                      ...message,
                      read: true,
                    };
                  }
                  return message;
                })),
            };
          }
          return otherUser;
        }
      ),
    };
  })
);
