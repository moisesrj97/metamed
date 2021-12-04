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

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('When it is instanciated', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('When loginWithToken is called', () => {
    it('httpClient should be called', () => {
      service.loginWithToken('token').subscribe((response: any) => {
        expect(response).not.toBe(null);
        expect(JSON.stringify(response)).toEqual(JSON.stringify(mockResponse));
      });

      const req = httpTestingController.expectOne(
        'http://localhost:3000/login/token'
      );

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

      const req = httpTestingController.expectOne(
        'http://localhost:3000/login/professional'
      );

      req.flush(mockResponse);

      const req2 = httpTestingController.expectOne(
        'http://localhost:3000/login/token'
      );

      req2.flush(mockResponse);
    });
  });
});
