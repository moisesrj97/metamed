import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { listenToMessages } from 'src/app/helpers/listenToMessages';
import { listenToPatientModification } from 'src/app/helpers/listenToPatientModification';
import { UserStore } from 'src/app/models/interfaces';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { receiveMessageToChat } from 'src/app/services/store/actions/chat.actions';
import { loginUser } from 'src/app/services/store/actions/user.actions';
import { TokenService } from 'src/app/services/token/token.service';
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
  userInfo!: UserStore;

  constructor(
    public authService: AuthenticationService,
    private store: Store<{
      userStore: UserStore;
      darkMode: { darkMode: boolean };
    }>,
    private router: Router,
    private fb: FormBuilder,
    public socket: WebsocketService,
    public tokenService: TokenService
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
          next: (loginData: any) => {
            this.store.dispatch(loginUser({ userInfo: { ...loginData } }));
            this.userInfo = loginData;

            listenToMessages(this, loginData);

            if (loginData.role === 'Patient') {
              console.log('Listening');
              const token =
                this.tokenService.getTokenFromLocalStorage() as string;

              listenToPatientModification(this, token);
            }

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
