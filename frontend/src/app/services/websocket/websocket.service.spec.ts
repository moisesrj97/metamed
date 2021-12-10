import { TestBed } from '@angular/core/testing';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { WebsocketService } from './websocket.service';

export const config: SocketIoConfig = { url: 'http://localhost:YOUR_PORT' };

describe('WebsocketService', () => {
  let service: WebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SocketIoModule.forRoot(config)],
      providers: [WebsocketService],
    });
    service = TestBed.inject(WebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Calling send message', () => {
    it('Should call socket.emit', () => {
      const spy = spyOn(service['socket'], 'emit');
      service.sendMessage({
        fromRole: 'Professional',
        from: '1',
        to: '2',
      } as any);
      expect(spy).toHaveBeenCalled();
    });
  });
});
