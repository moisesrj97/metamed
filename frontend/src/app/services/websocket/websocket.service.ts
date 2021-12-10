import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map, Observable, ObservableInput, withLatestFrom } from 'rxjs';
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

  getMessage(): Observable<MessageModel> {
    return this.socket.fromEvent('msgToClient') as Observable<MessageModel>;
  }

  connectToRoom(arr: string[]) {
    this.socket.emit('joinRoom', arr);
  }
}
