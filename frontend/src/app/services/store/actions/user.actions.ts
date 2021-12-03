import { createAction, props } from '@ngrx/store';
import {
  ExtraDataModel,
  UpdateUserDataDto,
  UserStore,
} from 'src/app/models/interfaces';

export const loginUser = createAction(
  '[User] Login User',
  props<{ userInfo: UserStore }>()
);

export const logoutUser = createAction('[User] Logout User');

export const updateUserBasicData = createAction(
  '[User] Update User Basic Data',
  props<{ fullDataUpdated: UpdateUserDataDto }>()
);

export const updatePatientExtraDataFromProfessional = createAction(
  '[User] Update User Basic Data',
  props<{ fullExtraDataUpdated: ExtraDataModel[]; patientId: string }>()
);

export const deleteUserFromProfessional = createAction(
  '[User] Delete User From Professional',
  props<{ patientId: string }>()
);
