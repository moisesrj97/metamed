import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  constructor(private socket: Socket) {}

  sendMessage(msg: string) {
    this.socket.emit('msgToServer', msg);
  }

  getMessage() {
    return this.socket.fromEvent('msgToClient');
  }
}
