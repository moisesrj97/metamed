import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserStore } from 'src/app/models/interfaces';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { loginUser } from 'src/app/services/store/actions/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  formGroup: FormGroup;
  roles: string[] = ['professional', 'patient'];
  authPopup: boolean = false;
  darkMode!: boolean;

  constructor(
    public authService: AuthenticationService,
    private store: Store<{
      userStore: UserStore;
      darkMode: { darkMode: boolean };
    }>,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['professional', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.store.select('darkMode').subscribe((data) => {
      this.darkMode = data.darkMode;
    });
  }

  submitForm(): void {
    if (this.formGroup.valid) {
      this.authService
        .loginWithoutToken(
          this.formGroup.value.email,
          this.formGroup.value.password,
          this.formGroup.value.role
        )
        .subscribe({
          next: (data: any) => {
            this.store.dispatch(loginUser({ userInfo: { ...data } }));
            this.router.navigate(['/dashboard']);
          },
          error: () => {
            this.authPopup = true;
            this.formGroup.reset();

            setTimeout(() => {
              this.authPopup = false;
            }, 2000);
          },
        });
    }
  }
}
