import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { SocketIoModule } from 'ngx-socket-io';
import { of } from 'rxjs';
import { UserStore } from 'src/app/models/interfaces';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { config } from 'src/app/services/websocket/websocket.service.spec';

import { AddModalComponent } from './add-modal.component';

describe('AddModalComponent', () => {
  let component: AddModalComponent;
  let fixture: ComponentFixture<AddModalComponent>;
  let store: MockStore;
  let initialState = {
    user: {
      _id: '',
      role: 'Professional',
      patients: [
        {
          refData: {
            _id: '61ae36e84ca6906a6b9bc5c5',
            surname: 'Patient',
            profilePicture:
              'https://metamed-images.s3.eu-west-3.amazonaws.com/4ab2273c-ffeb-428a-a678-7b3e715c0deb',
            name: 'Moisés Rodríguez Jurado',
          },
          extraData: [],
          chatRef: {
            _id: '61ae374c4ca6906a6b9bc5cc',
            messages: [],
            patient: '61ae36e84ca6906a6b9bc5c5',
            professional: '61ae32db4ca6906a6b9bc593',
          },
          exerciseGroups: [],
          mealGroups: [],
          notes: [],
        },
        {
          refData: {
            _id: '61ae36e84ca6906a6b9bc5c5',
            surname: 'Patient',
            profilePicture:
              'https://metamed-images.s3.eu-west-3.amazonaws.com/4ab2273c-ffeb-428a-a678-7b3e715c0deb',
            name: 'Pepe Rodríguez Jurado',
          },
          extraData: [],
          chatRef: {
            _id: '61ae374c4ca6906a6b9bc5cc',
            messages: [],
            patient: '61ae36e84ca6906a6b9bc5c5',
            professional: '61ae32db4ca6906a6b9bc593',
          },
          exerciseGroups: [],
          mealGroups: [],
          notes: [],
        },
      ],
      professionals: [
        {
          refData: {
            _id: '61ae36e84ca6906a6b9bc5c5',
            surname: 'Patient',
            profilePicture:
              'https://metamed-images.s3.eu-west-3.amazonaws.com/4ab2273c-ffeb-428a-a678-7b3e715c0deb',
            name: 'Moisés Rodríguez Jurado',
          },
          extraData: [],
          chatRef: {
            _id: '61ae374c4ca6906a6b9bc5cc',
            messages: [],
            patient: '61ae36e84ca6906a6b9bc5c5',
            professional: '61ae32db4ca6906a6b9bc593',
          },
          exerciseGroups: [],
          mealGroups: [],
          notes: [],
        },
      ],
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddModalComponent],
      imports: [HttpClientTestingModule, SocketIoModule.forRoot(config)],
      providers: [provideMockStore({ initialState }), WebsocketService],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When clicking outside modal', () => {
    it('closeModal.emit should be called', () => {
      spyOn(component.closeModal, 'emit');
      component.onGlobalClick({ target: { className: 'test' } });
      expect(component.closeModal.emit).toHaveBeenCalled();
    });
  });

  describe('When addPatient is called', () => {
    it('patientManagmentService.addPatientToList should be called', () => {
      spyOn(
        component.patientManagmentService,
        'addPatientToList'
      ).and.returnValue(of(initialState as unknown as UserStore));
      spyOn(component.closeModal, 'emit');
      spyOn(component.tokenService, 'getTokenFromLocalStorage').and.returnValue(
        'token'
      );
      spyOn(component.store, 'dispatch');

      component.input = '123456';

      component.addPatient();

      expect(
        component.patientManagmentService.addPatientToList
      ).toHaveBeenCalled();
    });
  });
});
