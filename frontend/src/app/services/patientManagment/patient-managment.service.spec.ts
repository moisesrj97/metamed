import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

const mockResponse: any = {
  data: {
    role: 'professional',
    id: 'f8f8f8f8f8f8',
  },
};

import { PatientManagmentService } from './patient-managment.service';

describe('Given PatientManagmentService', () => {
  let service: PatientManagmentService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PatientManagmentService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  describe('When it is instanciated', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('When addPatientToList is called', () => {
    it('httpClient should be called', () => {
      service
        .addPatientToList('test', 'test', 'test')
        .subscribe((response: any) => {
          expect(response).not.toBe(null);
          expect(JSON.stringify(response)).toEqual(
            JSON.stringify(mockResponse)
          );
        });

      const req = httpTestingController.expectOne({
        method: 'POST',
        url: 'http://localhost:3000/professional/test/patients',
      });

      req.flush(mockResponse);
    });
  });

  describe('When updateExtraDataFromPatient is called', () => {
    it('httpClient should be called', () => {
      service
        .updateExtraDataFromPatient(
          'test',
          'test',
          [{ key: 'test', value: 'test' }],
          'test'
        )
        .subscribe((response: any) => {
          expect(response).not.toBe(null);
          expect(JSON.stringify(response)).toEqual(
            JSON.stringify(mockResponse)
          );
        });

      const req = httpTestingController.expectOne({
        method: 'PATCH',
        url: 'http://localhost:3000/professional/test/patients/test',
      });

      req.flush(mockResponse);
    });
  });

  describe('When removePatientFromList is called', () => {
    it('httpClient should be called', () => {
      service
        .removePatientFromList('test', 'test', 'test')
        .subscribe((response: any) => {
          expect(response).not.toBe(null);
          expect(JSON.stringify(response)).toEqual(
            JSON.stringify(mockResponse)
          );
        });

      const req = httpTestingController.expectOne({
        method: 'DELETE',
        url: 'http://localhost:3000/professional/test/patients/test',
      });

      req.flush(mockResponse);
    });
  });
});
