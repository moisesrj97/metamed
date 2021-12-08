import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DetailsComponent } from 'src/app/details/details.component';

import { ExerciseGroupService } from './exercise-group.service';

const mockResponse: any = {
  data: {
    role: 'professional',
    id: 'f8f8f8f8f8f8',
  },
};

describe('Given ExerciseGroupService', () => {
  let service: ExerciseGroupService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'details/:id', component: DetailsComponent },
        ]),
      ],
    });
    service = TestBed.inject(ExerciseGroupService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  describe('When it is instanciated', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('When addExerciseGroupToPatient is called', () => {
    it('httpClient should be called', () => {
      service
        .addExerciseGroupToPatient('test', 'test', 'test')
        .subscribe((response: any) => {
          expect(response).not.toBe(null);
          expect(JSON.stringify(response)).toEqual(
            JSON.stringify(mockResponse)
          );
        });

      const req = httpTestingController.expectOne({
        method: 'POST',
        url: 'http://localhost:3000/exercise-group',
      });

      req.flush(mockResponse);
    });
  });

  describe('When updateExerciseGroupName is called', () => {
    it('httpClient should be called', () => {
      service
        .updateExerciseGroupName('test', 'test', 'test', 'test')
        .subscribe((response: any) => {
          expect(response).not.toBe(null);
          expect(JSON.stringify(response)).toEqual(
            JSON.stringify(mockResponse)
          );
        });

      const req = httpTestingController.expectOne({
        method: 'PATCH',
        url: 'http://localhost:3000/exercise-group/test',
      });

      req.flush(mockResponse);
    });
  });

  describe('When getExerciseGroup is called', () => {
    it('httpClient should be called', () => {
      service.getExerciseGroup('test', 'test').subscribe((response: any) => {
        expect(response).not.toBe(null);
        expect(JSON.stringify(response)).toEqual(JSON.stringify(mockResponse));
      });

      const req = httpTestingController.expectOne({
        method: 'GET',
        url: 'http://localhost:3000/exercise-group/test',
      });

      req.flush(mockResponse);
    });
  });

  describe('When deleteExerciseGroup is called', () => {
    it('httpClient should be called', () => {
      service
        .deleteExerciseGroup('test', 'test', 'test')
        .subscribe((response: any) => {
          expect(response).not.toBe(null);
          expect(JSON.stringify(response)).toEqual(
            JSON.stringify(mockResponse)
          );
        });

      const req = httpTestingController.expectOne({
        method: 'DELETE',
        url: 'http://localhost:3000/exercise-group/test/test',
      });

      req.flush(mockResponse);
    });
  });
});
