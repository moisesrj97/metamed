import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { SocketIoModule } from 'ngx-socket-io';
import { of } from 'rxjs';
import { ExerciseGroupModel, UserStore } from 'src/app/models/interfaces';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { config } from 'src/app/services/websocket/websocket.service.spec';

import { ExerciseGroupsComponent } from './exercise-groups.component';

const initialState = {
  user: {
    _id: '123',
    role: 'Patient',
    professionals: [
      { refData: { _id: '123' }, exerciseGroups: ['123'] },
      { refData: { _id: '1234' }, exerciseGroups: ['123'] },
    ],
  },
};

describe('ExerciseGroupsComponent', () => {
  let component: ExerciseGroupsComponent;
  let fixture: ComponentFixture<ExerciseGroupsComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExerciseGroupsComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        SocketIoModule.forRoot(config),
      ],
      providers: [provideMockStore({ initialState }), WebsocketService],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseGroupsComponent);
    component = fixture.componentInstance;
    component.route = {
      parent: { snapshot: { paramMap: { get: () => '123' } } },
    } as unknown as ActivatedRoute;
    spyOn(component.exerciseGroupService, 'getExerciseGroup').and.returnValue(
      of({} as unknown as ExerciseGroupModel)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When component loads', () => {
    it('exerciseGroups getexerciseGroups should be called', () => {
      expect(
        component.exerciseGroupService.getExerciseGroup
      ).toHaveBeenCalled();
    });
  });
});
