import { MessageModel, UserStore } from '../models/interfaces';
import { receiveMessageToChat } from '../services/store/actions/chat.actions';

export function listenToMessages(that: any, data: UserStore) {
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

  that.socket.getMessage().subscribe((msg: MessageModel) => {
    if (msg.to === that.userInfo._id) {
      that.store.dispatch(receiveMessageToChat({ message: msg }));
    }
  });
}
