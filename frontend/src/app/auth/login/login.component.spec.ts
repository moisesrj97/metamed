import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of, throwError } from 'rxjs';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';

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
      ],
      providers: [provideMockStore()],
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
        of('aaaaaaaaaaaaaaaaaaaa')
      );

      component.formGroup.controls['email'].setValue('fake@test.com');
      component.formGroup.controls['password'].setValue('aaaaaaaaaa');
      component.formGroup.controls['role'].setValue('professional');

      component.submitForm();

      expect(component.authService.loginWithoutToken).toHaveBeenCalled();
    });
  });

  describe('When submitForm is called with valid form', () => {
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
