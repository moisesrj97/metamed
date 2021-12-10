import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserStore } from './models/interfaces';
import { AuthenticationService } from './services/authentication/authentication.service';
import { toggleDarkMode } from './services/store/actions/darkMode.actions';
import { loginUser } from './services/store/actions/user.actions';
import { TokenService } from './services/token/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'frontend';
  userInfo: any;
  constructor(
    public authService: AuthenticationService,
    public store: Store<{ userStore: UserStore }>,
    private tokenService: TokenService
  ) {
    this.userInfo = undefined;
  }

  ngOnInit(): void {
    const token = this.tokenService.getTokenFromLocalStorage();

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.store.dispatch(toggleDarkMode());
    }

    if (token) {
      this.authService
        .loginWithToken(token)
        .subscribe((data: UserStore): void => {
          this.userInfo = data;
          this.store.dispatch(loginUser({ userInfo: { ...data } }));
        });
    }
  }
}
