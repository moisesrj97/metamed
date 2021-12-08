import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ExerciseService } from './exercise.service';

const mockResponse: any = {
  data: {
    role: 'professional',
    id: 'f8f8f8f8f8f8',
  },
};

describe('Given ExerciseService', () => {
  let service: ExerciseService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ExerciseService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  describe('When it is instanciated', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('When createExerciseInExerciseGroup is called', () => {
    it('httpClient should be called', () => {
      service
        .createExerciseInExerciseGroup(
          {
            name: '',
            amount: '',
            exerciseGroupId: '',
            exerciseImage: new Blob(['aaa']) as unknown as string,
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
        url: 'http://localhost:3000/exercise',
      });

      req.flush(mockResponse);
    });
  });

  describe('When updateExerciseInfo is called', () => {
    it('httpClient should be called', () => {
      service
        .updateExerciseInfo(
          'test',
          {
            name: '',
            amount: '',
            imageUrl: '',
            exerciseImage: new Blob(['aaa']) as unknown as string,
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
        url: 'http://localhost:3000/exercise/test',
      });

      req.flush(mockResponse);
    });
  });

  describe('When updateExerciseInfo is called', () => {
    it('httpClient should be called', () => {
      service
        .deleteExerciseFromGroup('test', 'test2', '')
        .subscribe((response: any) => {
          expect(response).not.toBe(null);
          expect(JSON.stringify(response)).toEqual(
            JSON.stringify(mockResponse)
          );
        });

      const req = httpTestingController.expectOne({
        method: 'DELETE',
        url: 'http://localhost:3000/exercise/test/test2',
      });

      req.flush(mockResponse);
    });
  });
});
