import { MessageModel, UserStore } from '../models/interfaces';
import { receiveMessageToChat } from '../services/store/actions/chat.actions';
import { loginUser } from '../services/store/actions/user.actions';

export function listenToMessages(that: any, data: UserStore, token: string) {
  const otherUsers =
    data.role === 'Professional' ? 'patients' : 'professionals';
  const mappedIds = data[otherUsers]?.map((e) => {
    if (data.role === 'Professional') {
      return data._id + e.refData._id;
    } else {
      return e.refData._id + data._id;
    }
  }) as string[];

  that.socket.connectToRoom(mappedIds);

  that.socket.getMessage().subscribe((msg: MessageModel & { type: string }) => {
    if (msg.type && data.role === 'Patient') {
      that.authService
        .loginWithToken(token)
        .subscribe((data: UserStore): void => {
          that.store.dispatch(loginUser({ userInfo: data }));
        });
    }

    if (msg.to === that.userInfo._id) {
      that.store.dispatch(receiveMessageToChat({ message: msg }));
    }
  });
}
