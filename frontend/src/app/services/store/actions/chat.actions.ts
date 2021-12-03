import { createAction, props } from '@ngrx/store';
import { MessageModel } from 'src/app/models/interfaces';

export const addMessageToChat = createAction(
  '[Chat] Add Message To Chat',
  props<{ message: MessageModel }>()
);

export const updateMessageReadState = createAction(
  '[Chat] Update Message Read State',
  props<{ message: MessageModel }>()
);
