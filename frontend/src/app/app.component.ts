import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MessageModel, UserStore } from './models/interfaces';
import { AuthenticationService } from './services/authentication/authentication.service';
import {
  addMessageToChat,
  receiveMessageToChat,
} from './services/store/actions/chat.actions';
import { toggleDarkMode } from './services/store/actions/darkMode.actions';
import { loginUser } from './services/store/actions/user.actions';
import { TokenService } from './services/token/token.service';
import { WebsocketService } from './services/websocket/websocket.service';

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
    private tokenService: TokenService,
    private socket: WebsocketService
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
          const otherUsers =
            data.role === 'Professional' ? 'patients' : 'professionals';
          const mappedIds = data[otherUsers]?.map((e) => {
            if (data.role === 'Professional') {
              return data._id + e.refData._id;
            } else {
              return e.refData._id + data._id;
            }
          }) as string[];
          console.log(mappedIds);

          this.socket.connectToRoom(mappedIds);

          this.socket.getMessage().subscribe((msg) => {
            if (msg.to === this.userInfo._id) {
              this.store.dispatch(receiveMessageToChat({ message: msg }));
            }
          });
        });
    }
  }
}
