import { MessageModel } from '../models/interfaces';

export function listenForGroupReloads(that: any) {
  that.socket.getMessage().subscribe((msg: MessageModel & { type: string }) => {
    if (msg.type && that.role === 'Patient') {
      that.fetchedData = [];
    }
  });
}
