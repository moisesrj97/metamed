import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AuthenticationService } from './authentication.service';

const mockResponse: any = {
  data: {
    role: 'professional',
    id: 'f8f8f8f8f8f8',
  },
};

const mockToken: string = 'imamocktoken';

describe('Given AuthenticationService', () => {
  let service: AuthenticationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthenticationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  describe('When it is instanciated', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  //! Jasmine says that the following test has no expectations.

  describe('When loginWithToken is called', () => {
    it('httpClient should be called', () => {
      service.loginWithToken('token').subscribe((response: any) => {
        expect(response).not.toBe(null);
        expect(JSON.stringify(response)).toEqual(JSON.stringify(mockResponse));
      });

      const req = httpTestingController.expectOne({
        method: 'POST',
        url: 'http://localhost:3000/login/token',
      });

      expect(req.request.url).toBe('http://localhost:3000/login/token');

      req.flush(mockResponse);
    });
  });

  describe('When loginWithoutToken is called', () => {
    it('httpClient should be called', () => {
      service
        .loginWithoutToken('test', 'test', 'professional')
        .subscribe((response: any) => {
          expect(response).not.toBe(null);
          expect(JSON.stringify(response)).toEqual(
            JSON.stringify(mockResponse)
          );
        });

      const req = httpTestingController.expectOne({
        method: 'POST',
        url: 'http://localhost:3000/login/professional',
      });

      req.flush(mockResponse);

      const req2 = httpTestingController.expectOne({
        method: 'POST',
        url: 'http://localhost:3000/login/token',
      });

      req2.flush(mockResponse);

      expect(req.request.url).toBe('http://localhost:3000/login/professional');
      expect(req2.request.url).toBe('http://localhost:3000/login/token');
    });
  });
});
