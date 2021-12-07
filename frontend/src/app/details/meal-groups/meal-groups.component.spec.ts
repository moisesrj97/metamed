import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealGroupsComponent } from './meal-groups.component';

describe('MealGroupsComponent', () => {
  let component: MealGroupsComponent;
  let fixture: ComponentFixture<MealGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealGroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
