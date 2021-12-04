import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserStore } from './models/interfaces';
import { AuthenticationService } from './services/authentication/authentication.service';
import { loginUser } from './services/store/actions/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';
  userInfo: any;
  constructor(
    private authService: AuthenticationService,
    private store: Store<{ userStore: UserStore }>
  ) {
    this.userInfo = undefined;
  }

  ngOnInit(): void {
    /* this.authService
      .loginWithToken(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYTdiMDU3NTQ0NzY4MjVmYjkzYmQzZiIsImVtYWlsIjoiZmFrZUB0ZXN0LmNvbSIsIm5hbWUiOiIgc3V1dXV1Iiwicm9sZSI6IlByb2Zlc3Npb25hbCIsImlhdCI6MTYzODUxNjQxN30.q25xktvuiMHX6VgKIx7jlhe9uTeiXVNQmVxlmoTAdQ4'
      )
      .subscribe((data: UserStore): void => {
        this.userInfo = data;
        this.store.dispatch(loginUser({ userInfo: { ...data } }));
      }); */
    /* this.authService
      .loginWithoutToken('fake@test.com', 'password', 'professional')
      .subscribe((data: any) => {
        this.userInfo = data;
        this.store.dispatch(loginUser({ userInfo: { ...data } }));
      }); */
  }
}
