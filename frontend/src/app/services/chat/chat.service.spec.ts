import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ChatService } from './chat.service';

const mockResponse: any = {
  data: {
    role: 'professional',
    id: 'f8f8f8f8f8f8',
  },
};

const mockToken: string = 'imamocktoken';

describe('Given ChatService', () => {
  let service: ChatService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ChatService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  describe('When it is instanciated', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('When addMessageToChat is called', () => {
    it('httpClient should be called', () => {
      service
        .addMessageToChat('test', 'test', 'test', 'test')
        .subscribe((response: any) => {
          expect(response).not.toBe(null);
          expect(JSON.stringify(response)).toEqual(
            JSON.stringify(mockResponse)
          );
        });

      const req = httpTestingController.expectOne({
        method: 'POST',
        url: 'http://localhost:3000/chat/test',
      });

      req.flush(mockResponse);
    });
  });

  describe('When toggleMessage is called', () => {
    it('httpClient should be called', () => {
      service.toggleMessage('test', 'test').subscribe((response: any) => {
        expect(response).not.toBe(null);
        expect(JSON.stringify(response)).toEqual(JSON.stringify(mockResponse));
      });

      const req = httpTestingController.expectOne({
        method: 'PATCH',
        url: 'http://localhost:3000/message/test',
      });

      req.flush(mockResponse);
    });
  });
});
