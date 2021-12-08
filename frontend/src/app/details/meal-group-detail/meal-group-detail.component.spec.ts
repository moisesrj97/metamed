import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealGroupDetailComponent } from './meal-group-detail.component';

describe('MealGroupDetailComponent', () => {
  let component: MealGroupDetailComponent;
  let fixture: ComponentFixture<MealGroupDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealGroupDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealGroupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
