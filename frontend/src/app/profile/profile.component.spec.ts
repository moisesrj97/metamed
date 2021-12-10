import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';

import { ProfileComponent } from './profile.component';

const initialState = {
  user: {
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
  },
  darkMode: {
    darkMode: true,
  },
};

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [HttpClientTestingModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;

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

  describe('When toggleEditing is called', () => {
    it('editing should toggle', () => {
      const prev = component.editing;
      component.toggleEditing();
      expect(component.editing).not.toEqual(prev);
    });
  });

  describe('When edit is called with exerciseImage field and invalid file', () => {
    it('.userInfoService.update(exerciseId should not be called', () => {
      component.fileError = false;

      spyOn(component.userInfoService, 'update').and.returnValue(
        of({
          _id: '123',
          name: 'test',
          role: 'Professional',
          profilePicture: 'test',
          surname: 'test',
          email: 'test',
          patients: [],
        })
      );
      try {
        component.edit({
          target: {
            name: 'profilePicture',
            value: 'test',
            files: [new Blob([], { type: 'test' })],
          },
        } as unknown as Event);
      } catch (e) {
        expect(e).toEqual(Error('File error'));
      }

      jasmine.clock().tick(500);

      expect(component.userInfoService.update).not.toHaveBeenCalled();
    });
  });

  describe('When edit is called with exerciseImage field', () => {
    it('.userInfoService.update should be called', () => {
      spyOn(component.userInfoService, 'update').and.returnValue(
        of({
          _id: '123',
          name: 'test',
          role: 'Professional',
          profilePicture: 'test',
          surname: 'test',
          email: 'test',
          patients: [],
        })
      );

      component.edit({
        target: {
          name: 'profilePicture',
          value: 'test',
          files: [new Blob([''], { type: 'image/png' })],
        },
      } as unknown as Event);

      jasmine.clock().tick(500);

      expect(component.fileError).toBeFalsy();
      expect(component.imageSrc).toBe(null);
      expect(component.userInfoService.update).toHaveBeenCalled();
    });
  });

  describe('When edit is called with name or amount field', () => {
    it('.userInfoService.update should be called', () => {
      spyOn(component.userInfoService, 'update').and.returnValue(
        of({
          _id: '123',
          name: 'test',
          role: 'Professional',
          profilePicture: 'test',
          surname: 'test',
          email: 'test',
          patients: [],
        })
      );

      component.edit({
        target: {
          name: 'name',
          value: 'test',
          files: [new Blob([''], { type: 'image/png' })],
        },
      } as unknown as Event);

      jasmine.clock().tick(500);

      expect(component.userInfoService.update).toHaveBeenCalled();
      expect(component.fileError).toBeFalsy();
      expect(component.imageSrc).toBe(null);
    });
  });
});
