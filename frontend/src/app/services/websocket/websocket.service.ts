import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { MessageModel } from 'src/app/models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  constructor(public socket: Socket) {}

  sendMessage(msg: MessageModel) {
    const room =
      msg.fromRole === 'Professional' ? msg.from + msg.to : msg.to + msg.from;

    this.socket.emit('msgToServer', { room, msg });
  }

  getMessage(): Observable<MessageModel> {
    return this.socket.fromEvent('msgToClient') as Observable<MessageModel>;
  }

  emitPatientListModification(payload: {
    professionalId: string;
    patientId: string;
    mode: string;
  }) {
    this.socket.emit('modifyPatientEmission', payload);
  }

  listenToPatientListModification(): Observable<any> {
    return this.socket.fromEvent('patientListModification');
  }

  connectToRoom(arr: string[]) {
    this.socket.emit('joinRoom', arr);
  }
}
