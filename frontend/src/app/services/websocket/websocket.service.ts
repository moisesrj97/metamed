import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { MessageModel } from 'src/app/models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  constructor(public socket: Socket) {}

  sendReload(professionalId: string, patientId: string) {
    this.socket.emit('msgToServer', {
      room: professionalId + patientId,
      msg: { type: 'reload' },
    });
  }

  sendMessage(msg: MessageModel) {
    const room =
      msg.fromRole === 'Professional' ? msg.from + msg.to : msg.to + msg.from;

    this.socket.emit('msgToServer', { room, msg });
  }

  getMessage(): Observable<MessageModel & { type: string }> {
    return this.socket.fromEvent('msgToClient') as Observable<
      MessageModel & { type: string }
    >;
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
