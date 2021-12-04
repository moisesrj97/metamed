import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { MealService } from './meal.service';

const mockResponse: any = {
  data: {
    role: 'professional',
    id: 'f8f8f8f8f8f8',
  },
};

describe('Given MealService', () => {
  let service: MealService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(MealService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  describe('When it is instanciated', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('When createMealInMealGroup is called', () => {
    it('httpClient should be called', () => {
      service
        .createMealInMealGroup(
          {
            name: '',
            amount: '',
            mealGroupId: '',
          },
          ''
        )
        .subscribe((response: any) => {
          expect(response).not.toBe(null);
          expect(JSON.stringify(response)).toEqual(
            JSON.stringify(mockResponse)
          );
        });

      const req = httpTestingController.expectOne({
        method: 'POST',
        url: 'http://localhost:3000/meal',
      });

      req.flush(mockResponse);
    });
  });

  describe('When updateMealInfo is called', () => {
    it('httpClient should be called', () => {
      service
        .updateMealInfo(
          'test',
          {
            name: '',
            amount: '',
          },
          ''
        )
        .subscribe((response: any) => {
          expect(response).not.toBe(null);
          expect(JSON.stringify(response)).toEqual(
            JSON.stringify(mockResponse)
          );
        });

      const req = httpTestingController.expectOne({
        method: 'PATCH',
        url: 'http://localhost:3000/meal/test',
      });

      req.flush(mockResponse);
    });
  });

  describe('When updateMealInfo is called', () => {
    it('httpClient should be called', () => {
      service
        .deleteMealFromGroup('test', 'test2', '')
        .subscribe((response: any) => {
          expect(response).not.toBe(null);
          expect(JSON.stringify(response)).toEqual(
            JSON.stringify(mockResponse)
          );
        });

      const req = httpTestingController.expectOne({
        method: 'DELETE',
        url: 'http://localhost:3000/meal/test/test2',
      });

      req.flush(mockResponse);
    });
  });
});
