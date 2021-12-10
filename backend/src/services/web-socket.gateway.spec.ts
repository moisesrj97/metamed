import { Test, TestingModule } from '@nestjs/testing';
import { WebSocketGatewayChat } from './web-socket.gateway';
import { Socket, Server } from 'socket.io';

describe('WebSocketGateway', () => {
  let gateway: WebSocketGatewayChat;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebSocketGatewayChat],
    }).compile();

    gateway = module.get<WebSocketGatewayChat>(WebSocketGatewayChat);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  describe('When handleJoinRoom is executed', () => {
    it('Client.join should be called', () => {
      const mockClient = {
        join: jest.fn(),
      };
      gateway.handleJoinRoom(mockClient as unknown as Socket, ['123']);
      expect(mockClient.join).toHaveBeenCalledWith(['123']);
    });
  });

  describe('When afterInit', () => {
    test('logger should be called', () => {
      jest.spyOn(gateway.logger, 'log');

      gateway.afterInit({} as unknown as Server);
      expect(gateway.logger.log).toHaveBeenCalledWith('Init');
    });
  });

  describe('When handleConnection', () => {
    test('logger should be called', () => {
      jest.spyOn(gateway.logger, 'log');

      gateway.handleConnection({ id: '123' } as unknown as Socket);
      expect(gateway.logger.log).toHaveBeenCalledWith('Client connected: 123');
    });
  });

  describe('When handleDisconnection', () => {
    test('logger should be called', () => {
      jest.spyOn(gateway.logger, 'log');

      gateway.handleDisconnect({ id: '123' } as unknown as Socket);
      expect(gateway.logger.log).toHaveBeenCalledWith(
        'Client disconnected: 123',
      );
    });
  });

  describe('When handleMessage is executed', () => {
    it('Server to should be called with roomId', () => {
      gateway.server = {
        to: jest.fn().mockReturnValue({
          emit: jest.fn() as any,
        }) as any,
        emit: jest.fn() as any,
      } as Server;

      gateway.handleMessage({} as unknown as Socket, { room: '123' });
      expect(gateway.server.to).toHaveBeenCalledWith('123');
    });
  });
});
