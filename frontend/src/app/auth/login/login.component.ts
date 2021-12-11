import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
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

            const otherUsers =
              loginData.role === 'Professional' ? 'patients' : 'professionals';
            const mappedIds = loginData[otherUsers]?.map((e: any) => {
              if (loginData.role === 'Professional') {
                return loginData._id + e.refData._id;
              } else {
                return e.refData._id + loginData._id;
              }
            }) as string[];

            this.socket.connectToRoom(mappedIds);

            this.socket.getMessage().subscribe((msg) => {
              console.log(msg, loginData._id);
              if (msg.to === loginData._id) {
                this.store.dispatch(receiveMessageToChat({ message: msg }));
              }
            });

            if (loginData.role === 'Patient') {
              console.log('Listening');
              this.socket
                .listenToPatientListModification()
                .subscribe((emissionData) => {
                  if (emissionData.patientId === loginData._id) {
                    console.log(emissionData);
                    const token =
                      this.tokenService.getTokenFromLocalStorage() as string;
                    this.authService
                      .loginWithToken(token)
                      .subscribe((data: UserStore): void => {
                        this.store.dispatch(
                          loginUser({ userInfo: { ...data } })
                        );
                      });
                    if (emissionData.mode === 'add') {
                      this.socket.connectToRoom([
                        emissionData.professionalId + emissionData.patientId,
                      ]);
                    }
                  }
                });
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
