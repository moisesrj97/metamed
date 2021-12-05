import { Component, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit {
  roles: string[] = ['professional', 'patient'];
  email: string;
  password: string;
  selectedRole: string;

  constructor(
    private authService: AuthenticationService,
    private store: Store<{ userStore: UserStore }>,
    private router: Router
  ) {
    this.email = '';
    this.password = '';
    this.selectedRole = 'professional';
  }

  submitForm(): void {
    this.authService
      .loginWithoutToken('fake@test.com', 'password', 'professional')
      .subscribe((data: any) => {
        this.store.dispatch(loginUser({ userInfo: { ...data } }));
        this.router.navigate(['/dashboard']);
      });
  }

  ngOnInit(): void {}
}
