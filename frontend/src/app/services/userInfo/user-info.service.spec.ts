import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { UserInfoService } from './user-info.service';

const mockResponse: any = {
  data: {
    role: 'professional',
    id: 'f8f8f8f8f8f8',
  },
};

describe('Given UserInfoService', () => {
  let service: UserInfoService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UserInfoService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  describe('When it is instanciated', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('When update is called on professional', () => {
    it('httpClient should be called', () => {
      service
        .update(
          '123',
          'professional',
          {
            name: 'test',
            surname: 'test',
            profilePicture: 'test',
            businessName: 'test',
            gender: 'test',
            birthDate: 'test',
            file: new Blob([], { type: 'image/png' }) as unknown as string,
          },
          'helloiamatoken'
        )
        .subscribe((response: any) => {
          expect(response).not.toBe(null);
          expect(JSON.stringify(response)).toEqual(
            JSON.stringify(mockResponse)
          );
        });

      const req = httpTestingController.expectOne({
        method: 'PATCH',
        url: 'http://localhost:3000/professional/123',
      });

      req.flush(mockResponse);
    });
  });

  describe('When update is called on patient', () => {
    it('httpClient should be called', () => {
      service
        .update(
          '123',
          'patient',
          {
            name: 'test',
            surname: 'test',
            profilePicture: 'test',
          },
          'helloiamatoken'
        )
        .subscribe((response: any) => {
          expect(response).not.toBe(null);
          expect(JSON.stringify(response)).toEqual(
            JSON.stringify(mockResponse)
          );
        });

      const req = httpTestingController.expectOne({
        method: 'PATCH',
        url: 'http://localhost:3000/patient/123',
      });

      req.flush(mockResponse);
    });
  });
});
