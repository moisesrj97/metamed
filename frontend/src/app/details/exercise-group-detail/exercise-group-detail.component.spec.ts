import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { UserStore } from 'src/app/models/interfaces';
import { DetailsComponent } from '../details.component';

import { ExerciseGroupDetailComponent } from './exercise-group-detail.component';

const initialState = {
  user: {
    role: 'Professional',
  },
  darkMode: {
    darkMode: true,
  },
};

describe('ExerciseGroupDetailComponent', () => {
  let component: ExerciseGroupDetailComponent;
  let fixture: ComponentFixture<ExerciseGroupDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExerciseGroupDetailComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'exercise-groups/:id', component: DetailsComponent },
        ]),
        FormsModule,
      ],
      providers: [provideMockStore({ initialState }), FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseGroupDetailComponent);
    component = fixture.componentInstance;
    spyOn(component.exerciseGroupService, 'getExerciseGroup').and.returnValue(
      of({
        _id: '123',
        author: '123',
        name: 'test',
        extra: 'extra test',
        exercises: [
          {
            _id: '123',
            name: 'test',
            image: 'test',
            author: 'test',
            amount: 'test',
          },
          {
            _id: '1234',
            name: 'test',
            image: 'test',
            author: 'test',
            amount: 'test',
          },
        ],
      })
    );
    spyOn(component.tokenService, 'getTokenFromLocalStorage').and.returnValue(
      'test'
    );
    jasmine.clock().install();
    fixture.detectChanges();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When toggle is called', () => {
    it('Editing should change', () => {
      const prev = component.editing;
      component.toggle();
      expect(component.editing).not.toEqual(prev);
    });
  });

  describe('When changetitle is called', () => {
    it('updateExerciseGroupName should be called', () => {
      spyOn(
        component.exerciseGroupService,
        'updateExerciseGroupName'
      ).and.returnValue(
        of({
          _id: '123',
          name: 'test',
          surname: 'test',
          role: 'Professional',
          profilePicture: 'test.jpg',
          email: 'test',
          patients: [],
        })
      );
      component.changeTitle();
      expect(
        component.exerciseGroupService.updateExerciseGroupName
      ).toHaveBeenCalled();
    });
  });

  describe('When changeExtra is called', () => {
    it('updateExerciseGroupName should be called', () => {
      spyOn(
        component.exerciseGroupService,
        'updateExerciseGroupName'
      ).and.returnValue(
        of({
          _id: '123',
          name: 'test',
          surname: 'test',
          role: 'Professional',
          profilePicture: 'test.jpg',
          email: 'test',
          patients: [],
        })
      );
      component.changeExtra();
      expect(
        component.exerciseGroupService.updateExerciseGroupName
      ).toHaveBeenCalled();
    });
  });

  describe('When addExercise is called with good conditions', () => {
    it('exerciseService.createExerciseInExerciseGroup should be called', () => {
      component.fileError = false;
      component.formGroup.setValue({ name: 'testo', amount: 'testo' });
      component.imageSrc = 'test';
      spyOn(
        component.exerciseService,
        'createExerciseInExerciseGroup'
      ).and.returnValue(
        of({
          _id: '123',
          name: 'test',
          amount: 'test',
          image: 'test',
          author: '123',
        })
      );
      component.addExercise();

      expect(
        component.exerciseService.createExerciseInExerciseGroup
      ).toHaveBeenCalled();
    });
  });

  describe('When deleteExercise is called', () => {
    it('exerciseService.deleteExerciseFromGroup should be called', () => {
      spyOn(
        component.exerciseService,
        'deleteExerciseFromGroup'
      ).and.returnValue(of({}));
      component.deleteExercise('123');
      expect(
        component.exerciseService.deleteExerciseFromGroup
      ).toHaveBeenCalled();
    });
  });

  describe('When editExercise is called with exerciseImage field and invalid file', () => {
    it('.exerciseService.updateExerciseInfo(exerciseId should not be called', () => {
      component.fileError = false;

      spyOn(component.exerciseService, 'updateExerciseInfo').and.returnValue(
        of({
          _id: '123',
          name: 'test',
          amount: 'test',
          image: 'test',
          author: '123',
        })
      );
      try {
        component.editExercise(
          {
            target: {
              name: 'name',
              value: 'test',
              files: [new Blob([], { type: 'test' })],
            },
          } as unknown as Event,
          '123',
          'exerciseImage'
        );
      } catch (e) {
        expect(e).toEqual(Error('File error'));
      }

      jasmine.clock().tick(500);

      expect(
        component.exerciseService.updateExerciseInfo
      ).not.toHaveBeenCalled();
    });
  });

  describe('When editExercise is called with exerciseImage field', () => {
    it('.exerciseService.updateExerciseInfo should be called', () => {
      spyOn(component.exerciseService, 'updateExerciseInfo').and.returnValue(
        of({
          _id: '123',
          name: 'test',
          amount: 'test',
          image: 'test',
          author: '123',
        })
      );

      component.editExercise(
        {
          target: {
            name: 'name',
            value: 'test',
            files: [new Blob([''], { type: 'image/png' })],
          },
        } as unknown as Event,
        '123',
        'exerciseImage'
      );

      jasmine.clock().tick(500);

      expect(component.fileError).toBeFalsy();
      expect(component.imageSrc).toBe(undefined);
      expect(component.exerciseService.updateExerciseInfo).toHaveBeenCalled();
    });
  });

  describe('When editExercise is called with name or amount field', () => {
    it('.exerciseService.updateExerciseInfo should be called', () => {
      spyOn(component.exerciseService, 'updateExerciseInfo').and.returnValue(
        of({
          _id: '123',
          name: 'test',
          amount: 'test',
          image: 'test',
          author: '123',
        })
      );

      component.editExercise(
        {
          target: {
            name: 'name',
            value: 'test',
            files: [new Blob([''], { type: 'image/png' })],
          },
        } as unknown as Event,
        '123',
        'name'
      );

      jasmine.clock().tick(500);

      expect(component.exerciseService.updateExerciseInfo).toHaveBeenCalled();
      expect(component.fileError).toBeFalsy();
      expect(component.imageSrc).toBe(undefined);
    });
  });

  describe('When editExercise is called with undefined field', () => {
    it('.exerciseService.updateExerciseInfo should be called', () => {
      spyOn(component.exerciseService, 'updateExerciseInfo').and.returnValue(
        of({
          _id: '123',
          name: 'test',
          amount: 'test',
          image: 'test',
          author: '123',
        })
      );

      component.editExercise(
        {
          target: {
            name: 'name',
            value: 'test',
            files: [new Blob([''], { type: 'image/png' })],
          },
        } as unknown as Event,
        '123',
        'asdasdas'
      );

      jasmine.clock().tick(500);

      expect(
        component.exerciseService.updateExerciseInfo
      ).not.toHaveBeenCalled();
      expect(component.fileError).toBeFalsy();
      expect(component.imageSrc).toBe(undefined);
    });
  });

  describe('When deleteExerciseGroup is called', () => {
    it('.exerciseService.updateExerciseInfo should be called', () => {
      spyOn(
        component.exerciseGroupService,
        'deleteExerciseGroup'
      ).and.returnValue(of({} as unknown as UserStore));

      component.deleteExerciseGroup();

      expect(
        component.exerciseGroupService.deleteExerciseGroup
      ).toHaveBeenCalled();
      expect(component.fileError).toBeFalsy();
      expect(component.imageSrc).toBe(undefined);
    });
  });
});
