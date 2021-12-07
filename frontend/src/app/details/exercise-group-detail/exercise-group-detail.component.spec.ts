import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseGroupDetailComponent } from './exercise-group-detail.component';

describe('ExerciseGroupDetailComponent', () => {
  let component: ExerciseGroupDetailComponent;
  let fixture: ComponentFixture<ExerciseGroupDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExerciseGroupDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseGroupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
