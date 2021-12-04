import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { MealGroupService } from './meal-group.service';

const mockResponse: any = {
  data: {
    role: 'professional',
    id: 'f8f8f8f8f8f8',
  },
};

describe('Given MealGroupService', () => {
  let service: MealGroupService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(MealGroupService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  describe('When it is instanciated', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('When addMealGroupToPatient is called', () => {
    it('httpClient should be called', () => {
      service
        .addMealGroupToPatient('test', 'test', 'test')
        .subscribe((response: any) => {
          expect(response).not.toBe(null);
          expect(JSON.stringify(response)).toEqual(
            JSON.stringify(mockResponse)
          );
        });

      const req = httpTestingController.expectOne({
        method: 'POST',
        url: 'http://localhost:3000/meal-group',
      });

      req.flush(mockResponse);
    });
  });

  describe('When updateMealGroupName is called', () => {
    it('httpClient should be called', () => {
      service
        .updateMealGroupName('test', 'test', 'test')
        .subscribe((response: any) => {
          expect(response).not.toBe(null);
          expect(JSON.stringify(response)).toEqual(
            JSON.stringify(mockResponse)
          );
        });

      const req = httpTestingController.expectOne({
        method: 'PATCH',
        url: 'http://localhost:3000/meal-group/test',
      });

      req.flush(mockResponse);
    });
  });

  describe('When getMealGroup is called', () => {
    it('httpClient should be called', () => {
      service.getMealGroup('test', 'test').subscribe((response: any) => {
        expect(response).not.toBe(null);
        expect(JSON.stringify(response)).toEqual(JSON.stringify(mockResponse));
      });

      const req = httpTestingController.expectOne({
        method: 'GET',
        url: 'http://localhost:3000/meal-group/test',
      });

      req.flush(mockResponse);
    });
  });

  describe('When deleteMealGroup is called', () => {
    it('httpClient should be called', () => {
      service.deleteMealGroup('test', 'test').subscribe((response: any) => {
        expect(response).not.toBe(null);
        expect(JSON.stringify(response)).toEqual(JSON.stringify(mockResponse));
      });

      const req = httpTestingController.expectOne({
        method: 'DELETE',
        url: 'http://localhost:3000/meal-group/test',
      });

      req.flush(mockResponse);
    });
  });
});
