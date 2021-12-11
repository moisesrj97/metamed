import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { UserStore } from 'src/app/models/interfaces';
import { DetailsComponent } from '../details.component';

import { MealGroupDetailComponent } from './meal-group-detail.component';

describe('MealGroupDetailComponent', () => {
  let component: MealGroupDetailComponent;
  let fixture: ComponentFixture<MealGroupDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MealGroupDetailComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'deltails/:id', component: DetailsComponent },
        ]),
        FormsModule,
      ],
      providers: [provideMockStore(), FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealGroupDetailComponent);
    component = fixture.componentInstance;
    spyOn(component.mealGroupService, 'getMealGroup').and.returnValue(
      of({
        _id: '123',
        author: '123',
        name: 'test',
        extra: 'extra test',
        meals: [
          {
            _id: '123',
            name: 'test',
            author: 'test',
            amount: 'test',
          },
          {
            _id: '1234',
            name: 'test',
            author: 'test',
            amount: 'test',
          },
        ],
      })
    );
    spyOn(component.tokenService, 'getTokenFromLocalStorage').and.returnValue(
      'test'
    );
    component.route = {
      snapshot: {
        paramMap: {
          get: () => '123',
        },
      },
      parent: {
        snapshot: {
          paramMap: {
            get: () => '123',
          },
        },
      },
    } as any;
    fixture.detectChanges();
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
    it('updatemealGroupName should be called', () => {
      spyOn(component.mealGroupService, 'updateMealGroupName').and.returnValue(
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
      component.changeTitleAndExtra();
      expect(component.mealGroupService.updateMealGroupName).toHaveBeenCalled();
    });
  });

  describe('When addmeal is called with good conditions', () => {
    it('mealService.createmealInmealGroup should be called', () => {
      component.formGroup.setValue({ name: 'testo', amount: 'testo' });
      console.log(component.formGroup.status);
      spyOn(component.mealService, 'createMealInMealGroup').and.returnValue(
        of({
          _id: '123',
          name: 'test',
          amount: 'test',
          author: '123',
        })
      );
      component.addMeal();

      expect(component.mealService.createMealInMealGroup).toHaveBeenCalled();
    });
  });

  describe('When deletemeal is called', () => {
    it('mealService.deletemealFromGroup should be called', () => {
      spyOn(component.mealService, 'deleteMealFromGroup').and.returnValue(
        of({})
      );
      component.deleteMeal('123');
      expect(component.mealService.deleteMealFromGroup).toHaveBeenCalled();
    });
  });

  describe('When editmeal is called with name or amount field', () => {
    it('.mealService.updatemealInfo should be called', () => {
      spyOn(component.mealService, 'updateMealInfo').and.returnValue(
        of({
          _id: '123',
          name: 'test',
          amount: 'test',
          image: 'test',
          author: '123',
        })
      );

      component.editMeal(
        {
          target: {
            name: 'name',
            value: 'test',
          },
        } as unknown as Event,
        '123'
      );

      expect(component.mealService.updateMealInfo).toHaveBeenCalled();
    });
  });

  describe('When deletemealGroup is called', () => {
    it('.mealService.updatemealInfo should be called', () => {
      spyOn(component.mealGroupService, 'deleteMealGroup').and.returnValue(
        of({} as unknown as UserStore)
      );

      component.deleteMealGroup();

      expect(component.mealGroupService.deleteMealGroup).toHaveBeenCalled();
    });
  });
});
