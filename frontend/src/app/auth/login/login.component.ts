import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserStore } from 'src/app/models/interfaces';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { receiveMessageToChat } from 'src/app/services/store/actions/chat.actions';
import { loginUser } from 'src/app/services/store/actions/user.actions';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';

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
    private fb: FormBuilder,
    public socket: WebsocketService
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

            const otherUsers =
              data.role === 'Professional' ? 'patients' : 'professionals';
            const mappedIds = data[otherUsers]?.map((e: any) => {
              if (data.role === 'Professional') {
                return data._id + e.refData._id;
              } else {
                return e.refData._id + data._id;
              }
            }) as string[];

            this.socket.connectToRoom(mappedIds);

            this.socket.getMessage().subscribe((msg) => {
              console.log(msg, data._id);
              if (msg.to === data._id) {
                this.store.dispatch(receiveMessageToChat({ message: msg }));
              }
            });

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
