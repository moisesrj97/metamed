import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class WebSocketGatewayChat
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  public logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: any): void {
    this.server.to(payload.room).emit('msgToClient', payload.msg);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, payload: string[]): void {
    this.logger.log(`User ${client.id} is joining ${payload}`);
    client.join(payload);
  }

  @SubscribeMessage('modifyPatientEmission')
  handleAddPatient(
    client: Socket,
    payload: { professionalId: string; patientId: string; mode: string },
  ): void {
    this.logger.log(
      `Professional ${payload.professionalId} has ${payload.mode} ${payload.patientId}`,
    );
    this.server.emit('patientListModification', payload);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
