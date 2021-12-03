import { createReducer } from '@ngrx/store';
import { UserStore } from 'src/app/models/interfaces';

const initialState: UserStore = {
  token: '',
  _id: '',
  name: '',
  surname: '',
  email: '',
  profilePicture: '',
  role: '',
};

export const userReducer = createReducer(initialState);
