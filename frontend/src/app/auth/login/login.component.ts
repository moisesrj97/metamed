import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError } from 'rxjs';
import { UserStore } from 'src/app/models/interfaces';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { loginUser } from 'src/app/services/store/actions/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  roles: string[] = ['professional', 'patient'];
  email: string;
  password: string;
  selectedRole: string;
  errorsPopup: { email: boolean; password: boolean; auth: boolean };

  constructor(
    private authService: AuthenticationService,
    private store: Store<{ userStore: UserStore }>,
    private router: Router
  ) {
    this.email = '';
    this.password = '';
    this.selectedRole = 'professional';
    this.errorsPopup = {
      email: false,
      password: false,
      auth: false,
    };
  }

  submitForm(): void {
    this.errorsPopup.email = this.email.length < 1;
    this.errorsPopup.password = this.password.length < 1;

    if (!this.errorsPopup.email && !this.errorsPopup.password) {
      this.authService
        .loginWithoutToken(this.email, this.password, this.selectedRole)
        .subscribe({
          next: (data: any) => {
            this.store.dispatch(loginUser({ userInfo: { ...data } }));
            this.router.navigate(['/dashboard']);
          },
          error: () => {
            this.errorsPopup.auth = true;
            this.email = '';
            this.password = '';
            setTimeout(() => {
              this.errorsPopup.auth = false;
            }, 2000);
          },
        });
    }
  }

  ngOnInit(): void {}
}
