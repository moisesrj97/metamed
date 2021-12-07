import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { MealGroupsComponent } from './meal-groups.component';

describe('MealGroupsComponent', () => {
  let component: MealGroupsComponent;
  let fixture: ComponentFixture<MealGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MealGroupsComponent],
      imports: [RouterTestingModule],
      providers: [provideMockStore()],
    }).compileComponents();
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
