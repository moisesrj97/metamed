import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { pipe } from 'rxjs';
import { UserStore } from 'src/app/models/interfaces';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { RegisterService } from 'src/app/services/register/register.service';
import { loginUser } from 'src/app/services/store/actions/user.actions';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  compWindow: Window;
  formGroup: FormGroup;
  roles: string[] = ['Professional', 'Patient'];
  fileError: boolean = false;
  registerError: boolean = false;
  imageSrc!: string;

  constructor(
    public registerService: RegisterService,
    public authService: AuthenticationService,
    private tokenService: TokenService,
    private store: Store<{ user: UserStore }>,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.compWindow = window;
    this.formGroup = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      surname: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      role: ['Professional', [Validators.required]],
      profilePicture: ['', [Validators.required]],
      gender: '',
      birthDate: '',
      businessName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.formGroup.valueChanges.subscribe((values) => {
      this.formGroup.controls['businessName'].clearValidators();
      this.formGroup.controls['gender'].clearValidators();
      this.formGroup.controls['birthDate'].clearValidators();

      if (values['role'] === 'Professional') {
        this.formGroup.controls['gender'].updateValueAndValidity({
          onlySelf: true,
        });
        this.formGroup.controls['birthDate'].updateValueAndValidity({
          onlySelf: true,
        });
        this.formGroup.controls['businessName'].addValidators([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]);
      } else {
        this.formGroup.controls['businessName'].updateValueAndValidity({
          onlySelf: true,
        });
        this.formGroup.controls['gender'].addValidators([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]);
        this.formGroup.controls['birthDate'].addValidators([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]);
      }
    });
  }

  submitForm() {
    if (this.formGroup.valid && !this.fileError) {
      if (this.formGroup.value['role'] === 'Professional') {
        this.registerService
          .registerProfessional({
            name: this.formGroup.value['name'],
            surname: this.formGroup.value['surname'],
            email: this.formGroup.value['email'],
            password: this.formGroup.value['password'],
            profilePicture: this.imageSrc,
            businessName: this.formGroup.value['businessName'],
          })
          .subscribe({
            next: pipe(
              (data: UserStore) =>
                this.store.dispatch(loginUser({ userInfo: { ...data } })),
              () => {
                this.authService
                  .loginWithoutToken(
                    this.formGroup.value['email'],
                    this.formGroup.value['password'],
                    this.formGroup.value['role']
                  )
                  .subscribe(() => this.compWindow.location.reload());
              }
            ),
            error: () => {
              this.registerError = true;
              this.formGroup.reset();

              setTimeout(() => {
                this.registerError = false;
              }, 2000);
            },
          });
      } else {
        this.registerService
          .registerPatient({
            name: this.formGroup.value['name'],
            surname: this.formGroup.value['surname'],
            email: this.formGroup.value['email'],
            password: this.formGroup.value['password'],
            profilePicture: this.imageSrc,
            birthDate: this.formGroup.value['birthDate'],
            gender: this.formGroup.value['gender'],
          })
          .subscribe({
            next: pipe(
              (data: UserStore) =>
                this.store.dispatch(loginUser({ userInfo: { ...data } })),
              () => {
                this.authService
                  .loginWithoutToken(
                    this.formGroup.value['email'],
                    this.formGroup.value['password'],
                    this.formGroup.value['role']
                  )
                  .subscribe(() => this.compWindow.location.reload());
              }
            ),
            error: () => {
              this.registerError = true;
              this.formGroup.reset();

              setTimeout(() => {
                this.registerError = false;
              }, 2000);
            },
          });
      }
    }
  }

  fileChecker(fileEvent: any) {
    const file = fileEvent.target.files[0];
    if (
      !['image/jpeg', 'image/png'].includes(file.type) ||
      file.size > 10000000
    ) {
      this.fileError = true;
    } else {
      this.fileError = false;
    }

    const reader = new FileReader();

    if (fileEvent.target.files && fileEvent.target.files.length) {
      const [filem] = fileEvent.target.files;
      reader.readAsDataURL(filem);

      reader.onload = () => {
        this.imageSrc = filem;
      };
    }
  }
}
