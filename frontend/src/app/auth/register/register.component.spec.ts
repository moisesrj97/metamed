import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of, throwError } from 'rxjs';

import { RegisterComponent } from './register.component';

const myWindow = {
  location: {
    reload() {
      return 'something';
    },
  },
};

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
      ],
      providers: [provideMockStore()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.compWindow = myWindow as unknown as Window;
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When form values change with role professional', () => {
    it('BussinessName should have validator', () => {
      component.formGroup.controls['role'].setValue('Professional');
      expect(
        component.formGroup.controls['businessName'].hasValidator(
          Validators.required
        )
      ).toBe(true);
    });
  });

  describe('When form values change with role patient', () => {
    it('Gender should have validator', () => {
      component.formGroup.controls['role'].setValue('Patient');
      expect(
        component.formGroup.controls['gender'].hasValidator(Validators.required)
      ).toBe(true);
    });
  });

  describe('When submitForm is called with professional Role', () => {
    it('register should be called', () => {
      spyOn(component.compWindow.location, 'reload').and.callFake(() => {});

      component.formGroup.controls['role'].setValue('Professional');

      component.formGroup.controls['name'].setValue('test');
      component.formGroup.controls['surname'].setValue('test');
      component.formGroup.controls['email'].setValue('test@test.com');
      component.formGroup.controls['password'].setValue('test13213');
      component.formGroup.controls['businessName'].setValue('test');
      component.formGroup.controls['profilePicture'].setValue('');

      component.formGroup.controls['profilePicture'].clearValidators();
      component.formGroup.controls['profilePicture'].updateValueAndValidity({
        onlySelf: true,
      });

      component.fileError = false;

      spyOn(component.registerService, 'registerProfessional').and.returnValue(
        of({
          _id: '123',
          name: 'test',
          surname: 'test',
          email: 'test@test.com',
          businessName: 'test',
          role: 'Professional',
          profilePicture: '',
        })
      );

      spyOn(component.authService, 'loginWithoutToken').and.returnValue(
        of('helloimatoken')
      );

      component.formGroup.clearValidators();
      component.formGroup.updateValueAndValidity();

      component.submitForm();

      expect(component.registerService.registerProfessional).toHaveBeenCalled();
      expect(component.authService.loginWithoutToken).toHaveBeenCalled();
    });
  });

  describe('When submitForm is called with professional Role and throws error', () => {
    it('register should be called', () => {
      spyOn(component.compWindow.location, 'reload').and.callFake(() => {});

      component.formGroup.controls['role'].setValue('Professional');

      component.formGroup.controls['name'].setValue('test');
      component.formGroup.controls['surname'].setValue('test');
      component.formGroup.controls['email'].setValue('test@test.com');
      component.formGroup.controls['password'].setValue('test13213');
      component.formGroup.controls['businessName'].setValue('test');
      component.formGroup.controls['profilePicture'].setValue('');

      component.formGroup.controls['profilePicture'].clearValidators();
      component.formGroup.controls['profilePicture'].updateValueAndValidity({
        onlySelf: true,
      });

      component.fileError = false;

      spyOn(component.registerService, 'registerProfessional').and.returnValue(
        throwError(() => new Error('aaa'))
      );

      spyOn(component.authService, 'loginWithoutToken').and.returnValue(
        of('helloimatoken')
      );

      component.formGroup.clearValidators();
      component.formGroup.updateValueAndValidity();

      component.submitForm();

      expect(component.registerService.registerProfessional).toHaveBeenCalled();
      expect(component.authService.loginWithoutToken).not.toHaveBeenCalled();

      jasmine.clock().tick(3000);

      expect(component.registerError).toBeFalse();
    });
  });

  describe('When submitForm is called with professional Patient', () => {
    it('register should be called', () => {
      spyOn(component.compWindow.location, 'reload').and.callFake(() => {});

      component.formGroup.controls['role'].setValue('Patient');

      component.formGroup.controls['name'].setValue('test');
      component.formGroup.controls['surname'].setValue('test');
      component.formGroup.controls['email'].setValue('test@test.com');
      component.formGroup.controls['password'].setValue('test13213');
      component.formGroup.controls['gender'].setValue('test');
      component.formGroup.controls['birthDate'].setValue('test');
      component.formGroup.controls['profilePicture'].setValue('');

      component.formGroup.controls['profilePicture'].clearValidators();
      component.formGroup.controls['profilePicture'].updateValueAndValidity({
        onlySelf: true,
      });

      component.fileError = false;

      spyOn(component.registerService, 'registerPatient').and.returnValue(
        of({
          _id: '123',
          name: 'test',
          surname: 'test',
          email: 'test@test.com',
          gender: 'test',
          birthDate: 'test',
          role: 'Patient',
          profilePicture: '',
        })
      );

      spyOn(component.authService, 'loginWithoutToken').and.returnValue(
        of('helloimatoken')
      );

      component.formGroup.clearValidators();
      component.formGroup.updateValueAndValidity();

      component.submitForm();

      expect(component.registerService.registerPatient).toHaveBeenCalled();
      expect(component.authService.loginWithoutToken).toHaveBeenCalled();
    });
  });

  describe('When submitForm is called with professional Patient and throws error', () => {
    it('register should be called', () => {
      spyOn(component.compWindow.location, 'reload').and.callFake(() => {});

      component.formGroup.controls['role'].setValue('Patient');

      component.formGroup.controls['name'].setValue('test');
      component.formGroup.controls['surname'].setValue('test');
      component.formGroup.controls['email'].setValue('test@test.com');
      component.formGroup.controls['password'].setValue('test13213');
      component.formGroup.controls['gender'].setValue('test');
      component.formGroup.controls['birthDate'].setValue('test');
      component.formGroup.controls['profilePicture'].setValue('');

      component.formGroup.controls['profilePicture'].clearValidators();
      component.formGroup.controls['profilePicture'].updateValueAndValidity({
        onlySelf: true,
      });

      component.fileError = false;

      spyOn(component.registerService, 'registerPatient').and.returnValue(
        throwError(() => new Error('aaa'))
      );

      spyOn(component.authService, 'loginWithoutToken').and.returnValue(
        of('helloimatoken')
      );

      component.formGroup.clearValidators();
      component.formGroup.updateValueAndValidity();

      component.submitForm();

      expect(component.registerService.registerPatient).toHaveBeenCalled();
      expect(component.authService.loginWithoutToken).not.toHaveBeenCalled();

      jasmine.clock().tick(3000);

      expect(component.registerError).toBeFalse();
    });
  });

  describe('When FileChecker is called with valid file', () => {
    it('fileError should be false ', () => {
      component.fileChecker({
        target: { files: [new File([], 'aadad', { type: 'image/png' })] },
      });
      expect(component.fileError).toBeFalse();
    });
  });

  describe('When FileChecker is called with invalid file', () => {
    it('fileError should be false ', () => {
      component.fileChecker({
        target: { files: [new File([], 'aadad', { type: 'image/asdasd' })] },
      });
      expect(component.fileError).toBeTrue();
    });
  });
});
