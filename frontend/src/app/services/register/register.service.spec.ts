import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { RegisterService } from './register.service';

const mockResponse: any = {
  data: {
    role: 'professional',
    id: 'f8f8f8f8f8f8',
  },
};

describe('Given RegisterService', () => {
  let service: RegisterService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RegisterService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  describe('When it is instanciated', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('When registerProfessional is called', () => {
    it('httpClient should be called', () => {
      service
        .registerProfessional({
          email: '',
          businessName: '',
          name: '',
          surname: '',
          password: '',
          profilePicture: { test: 'test' } as unknown as File,
        })
        .subscribe((response: any) => {
          expect(response).not.toBe(null);
          expect(JSON.stringify(response)).toEqual(
            JSON.stringify(mockResponse)
          );
        });

      const req = httpTestingController.expectOne(
        'http://localhost:3000/professional'
      );

      req.flush(mockResponse);
    });
  });

  describe('When registerPatient is called', () => {
    it('httpClient should be called', () => {
      service
        .registerPatient({
          email: '',
          gender: '',
          birthDate: '',
          name: '',
          surname: '',
          password: '',
          profilePicture: { test: 'test' } as unknown as File,
        })
        .subscribe((response: any) => {
          expect(response).not.toBe(null);
          expect(JSON.stringify(response)).toEqual(
            JSON.stringify(mockResponse)
          );
        });

      const req = httpTestingController.expectOne(
        'http://localhost:3000/patient'
      );

      req.flush(mockResponse);
    });
  });
});
