import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { SocketIoModule } from 'ngx-socket-io';
import { of } from 'rxjs';
import { MealGroupModel, UserStore } from 'src/app/models/interfaces';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { config } from 'src/app/services/websocket/websocket.service.spec';

import { MealGroupsComponent } from './meal-groups.component';

const initialState = {
  user: {
    _id: '123',
    role: 'Patient',
    professionals: [
      { refData: { _id: '123' }, mealGroups: ['123'] },
      { refData: { _id: '1234' }, mealGroups: ['123'] },
    ],
  },
};

describe('MealGroupsComponent', () => {
  let component: MealGroupsComponent;
  let fixture: ComponentFixture<MealGroupsComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MealGroupsComponent],
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
    fixture = TestBed.createComponent(MealGroupsComponent);
    component = fixture.componentInstance;
    component.route = {
      parent: { snapshot: { paramMap: { get: () => '123' } } },
    } as unknown as ActivatedRoute;
    spyOn(component.mealGroupService, 'getMealGroup').and.returnValue(
      of({} as unknown as MealGroupModel)
    );
    spyOn(component.socket, 'getMessage').and.returnValue(
      of({ type: 'reload' } as any)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When component loads', () => {
    it('mealGroups getMEalGroups should be called', () => {
      expect(component.mealGroupService.getMealGroup).toHaveBeenCalled();
    });
  });

  describe('When addGroup is called', () => {
    it('Store dispatch should be called', () => {
      spyOn(component.store, 'dispatch').and.returnValue();
      spyOn(
        component.mealGroupService,
        'addMealGroupToPatient'
      ).and.returnValue(
        of({
          patients: [{ refData: '123', mealGroups: ['123'] }],
        } as unknown as UserStore)
      );

      component.input = 'Test';

      component.addGroup();

      expect(store.dispatch).toHaveBeenCalled();
    });
  });
});
