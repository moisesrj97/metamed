import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { SocketIoModule } from 'ngx-socket-io';
import { of } from 'rxjs';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { UserStore } from 'src/app/models/interfaces';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { config } from 'src/app/services/websocket/websocket.service.spec';

import { InfoComponent } from './info.component';

describe('InfoComponent', () => {
  let component: InfoComponent;
  let fixture: ComponentFixture<InfoComponent>;
  let initialState = {
    user: {
      _id: '123',
      patients: [{ refData: { _id: '123' }, extraData: [] }],
    },
  };
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'dashboard', component: DashboardComponent },
        ]),
        HttpClientTestingModule,
        SocketIoModule.forRoot(config),
      ],
      providers: [provideMockStore({ initialState }), WebsocketService],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoComponent);
    component = fixture.componentInstance;
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
    expect(component.data.extraData).toEqual([]);
  });

  describe('When addExtraData is called', () => {
    it('PAtient managment service should be called', () => {
      component.data.extraData = [{ key: 'test', value: 'test' }];
      spyOn(component.tokenService, 'getTokenFromLocalStorage').and.returnValue(
        'test'
      );
      spyOn(
        component.patientManageService,
        'updateExtraDataFromPatient'
      ).and.returnValue(of({} as unknown as UserStore));

      component.addExtraData();

      expect(
        component.patientManageService.updateExtraDataFromPatient
      ).toHaveBeenCalled();
    });
  });

  describe('When deleteXtraData is called', () => {
    it('PAtient managment service should be called', () => {
      component.data.extraData = [{ key: 'test', value: 'test' }];
      spyOn(component.tokenService, 'getTokenFromLocalStorage').and.returnValue(
        'test'
      );
      spyOn(
        component.patientManageService,
        'updateExtraDataFromPatient'
      ).and.returnValue(of({} as unknown as UserStore));

      component.deleteExtraData(1);

      expect(
        component.patientManageService.updateExtraDataFromPatient
      ).toHaveBeenCalled();
    });
  });

  describe('When deletePatient is called', () => {
    it('PAtient managment service should be called', () => {
      component.data.extraData = [{ key: 'test', value: 'test' }];
      spyOn(component.tokenService, 'getTokenFromLocalStorage').and.returnValue(
        'test'
      );
      spyOn(
        component.patientManageService,
        'removePatientFromList'
      ).and.returnValue(of({} as unknown as UserStore));

      component.deletePatient();

      expect(
        component.patientManageService.removePatientFromList
      ).toHaveBeenCalled();
    });
  });
});
