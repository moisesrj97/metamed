import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map, withLatestFrom } from 'rxjs';
import { MessageModel } from 'src/app/models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  constructor(private socket: Socket) {}

  sendMessage(msg: MessageModel) {
    const room =
      msg.fromRole === 'Professional' ? msg.from + msg.to : msg.to + msg.from;

    this.socket.emit('msgToServer', { room, msg });
  }

  getMessage() {
    this.socket.connect();
    return this.socket.fromEvent('msgToClient');
  }

  connectToRoom(arr: string[]) {
    this.socket.emit('joinRoom', arr);
  }
}
