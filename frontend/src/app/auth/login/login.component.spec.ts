import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { SocketIoModule } from 'ngx-socket-io';
import { Observable, of, throwError } from 'rxjs';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { config } from 'src/app/services/websocket/websocket.service.spec';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'dashboard', component: DashboardComponent },
        ]),
        FormsModule,
        ReactiveFormsModule,
        SocketIoModule.forRoot(config),
      ],
      providers: [provideMockStore(), WebsocketService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When submitForm is called with valid form', () => {
    it('Should update the form', () => {
      spyOn(component.authService, 'loginWithoutToken').and.returnValue(
        of({
          _id: '123',
          username: 'test',
          patients: [{ refData: { _id: '123', name: 'test' } }],
          role: 'Professional',
        } as any)
      );

      spyOn(component.socket, 'connectToRoom').and.callThrough();

      spyOn(component.socket, 'getMessage').and.returnValue(
        of({
          _id: '123',
          to: '123',
          from: '123',
        }) as any
      );

      component.formGroup.controls['email'].setValue('fake@test.com');
      component.formGroup.controls['password'].setValue('aaaaaaaaaa');
      component.formGroup.controls['role'].setValue('professional');

      component.submitForm();

      expect(component.socket.connectToRoom).toHaveBeenCalled();
      expect(component.socket.getMessage).toHaveBeenCalled();
    });
  });

  describe('When submitForm is called with valid form and its patient', () => {
    it('Should update the form', () => {
      spyOn(component.authService, 'loginWithoutToken').and.returnValue(
        of({
          _id: '123',
          username: 'test',
          professionals: [{ refData: { _id: '123', name: 'test' } }],
          role: 'Patient',
        } as any)
      );

      spyOn(component.socket, 'connectToRoom').and.callThrough();

      spyOn(component.socket, 'getMessage').and.returnValue(
        of({
          _id: '123',
          to: '123',
          from: '123',
        }) as any
      );

      spyOn(
        component.socket,
        'listenToPatientListModification'
      ).and.returnValue(
        of({ professionalId: '123', patientId: '123', mode: 'add' })
      );

      spyOn(component.authService, 'loginWithToken').and.returnValue(
        of({} as any)
      );

      component.formGroup.controls['email'].setValue('fake@test.com');
      component.formGroup.controls['password'].setValue('aaaaaaaaaa');
      component.formGroup.controls['role'].setValue('professional');

      component.submitForm();

      expect(component.socket.connectToRoom).toHaveBeenCalled();
      expect(component.socket.getMessage).toHaveBeenCalled();
    });
  });

  describe('When submitForm is called with invalid form', () => {
    it('Should update the form', () => {
      spyOn(component.authService, 'loginWithoutToken').and.returnValue(
        throwError(() => new Error('test'))
      );

      component.formGroup.controls['email'].setValue('fake@test.com');
      component.formGroup.controls['password'].setValue('aaaaaaaaaa');
      component.formGroup.controls['role'].setValue('professional');

      component.submitForm();

      expect(component.authService.loginWithoutToken).toHaveBeenCalled();
      expect(component.authPopup).toBeTrue();

      jasmine.clock().tick(3000);

      expect(component.authPopup).toBeFalse();
    });
  });
});
