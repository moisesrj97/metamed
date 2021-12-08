import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { NoteService } from './note.service';

const mockResponse: any = {
  data: {
    role: 'professional',
    id: 'f8f8f8f8f8f8',
  },
};

describe('Given NoteService', () => {
  let service: NoteService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(NoteService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  describe('When it is instanciated', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('When addNoteToPatient is called', () => {
    it('httpClient should be called', () => {
      service
        .addNoteToPatient('test', 'test', 'test')
        .subscribe((response: any) => {
          expect(response).not.toBe(null);
          expect(JSON.stringify(response)).toEqual(
            JSON.stringify(mockResponse)
          );
        });

      const req = httpTestingController.expectOne({
        method: 'POST',
        url: 'http://localhost:3000/note',
      });

      req.flush(mockResponse);
    });
  });

  describe('When updateNoteName is called', () => {
    it('httpClient should be called', () => {
      service
        .updateNoteName('test', 'test', 'test', 'test')
        .subscribe((response: any) => {
          expect(response).not.toBe(null);
          expect(JSON.stringify(response)).toEqual(
            JSON.stringify(mockResponse)
          );
        });

      const req = httpTestingController.expectOne({
        method: 'PATCH',
        url: 'http://localhost:3000/note/test',
      });

      req.flush(mockResponse);
    });
  });

  describe('When getNote is called', () => {
    it('httpClient should be called', () => {
      service.getNote('test', 'test').subscribe((response: any) => {
        expect(response).not.toBe(null);
        expect(JSON.stringify(response)).toEqual(JSON.stringify(mockResponse));
      });

      const req = httpTestingController.expectOne({
        method: 'GET',
        url: 'http://localhost:3000/note/test',
      });

      req.flush(mockResponse);
    });
  });

  describe('When deleteNote is called', () => {
    it('httpClient should be called', () => {
      service.deleteNote('test', 'test', '').subscribe((response: any) => {
        expect(response).not.toBe(null);
        expect(JSON.stringify(response)).toEqual(JSON.stringify(mockResponse));
      });

      const req = httpTestingController.expectOne({
        method: 'DELETE',
        url: 'http://localhost:3000/note/test/test',
      });

      req.flush(mockResponse);
    });
  });
});
