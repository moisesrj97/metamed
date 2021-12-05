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
  badAuthPopup: boolean;

  constructor(
    private authService: AuthenticationService,
    private store: Store<{ userStore: UserStore }>,
    private router: Router
  ) {
    this.email = '';
    this.password = '';
    this.selectedRole = 'professional';
    this.badAuthPopup = false;
  }

  submitForm(): void {
    this.authService
      .loginWithoutToken(this.email, this.password, this.selectedRole)
      .subscribe({
        next: (data: any) => {
          this.store.dispatch(loginUser({ userInfo: { ...data } }));
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.badAuthPopup = true;
          this.email = '';
          this.password = '';
        },
      });
  }

  ngOnInit(): void {}
}
