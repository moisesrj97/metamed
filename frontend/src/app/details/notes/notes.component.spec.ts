import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { NoteModel, UserStore } from 'src/app/models/interfaces';

import { NotesComponent } from './notes.component';

const initialState = {
  user: {
    _id: '123',
    patients: [
      { refData: { _id: '123' }, notes: ['123'] },
      { refData: { _id: '1234' }, notes: ['123'] },
    ],
  },
};

describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotesComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    component.route = {
      parent: { snapshot: { paramMap: { get: () => '123' } } },
    } as unknown as ActivatedRoute;
    spyOn(component.noteService, 'getNote').and.returnValue(
      of({} as unknown as NoteModel)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When component loads', () => {
    it('mealGroups getMEalGroups should be called', () => {
      expect(component.noteService.getNote).toHaveBeenCalled();
    });
  });

  describe('When addGroup is called', () => {
    it('Store dispatch should be called', () => {
      spyOn(component.store, 'dispatch').and.returnValue();
      spyOn(component.noteService, 'addNoteToPatient').and.returnValue(
        of({
          patients: [{ refData: '123', notes: ['123'] }],
        } as unknown as UserStore)
      );

      component.input = 'Test';

      component.addGroup();

      expect(store.dispatch).toHaveBeenCalled();
    });
  });
});
