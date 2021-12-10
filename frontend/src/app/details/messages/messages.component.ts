import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  ChatRefModel,
  PatientModel,
  ProfessionalModel,
  UserStore,
} from 'src/app/models/interfaces';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ChatService } from 'src/app/services/chat/chat.service';
import {
  addMessageToChat,
  updateMessageReadState,
} from 'src/app/services/store/actions/chat.actions';
import { TokenService } from 'src/app/services/token/token.service';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  id!: string;
  userId!: string;
  newMessage!: string;
  data: ChatRefModel = {
    _id: '',
    messages: [],
    professional: '',
    patient: '',
  };
  darkMode!: boolean;
  chatSubscription!: Subscription;

  constructor(
    public route: ActivatedRoute,
    private store: Store<{ user: UserStore; darkMode: { darkMode: boolean } }>,
    public chatService: ChatService,
    public authService: AuthenticationService,
    private tokenService: TokenService,
    public socket: WebsocketService
  ) {}

  ngOnInit(): void {
    this.store.select('darkMode').subscribe((data) => {
      this.darkMode = data.darkMode;
    });

    this.id = this.route.parent?.snapshot.paramMap.get('id') as string;
    const token = this.tokenService.getTokenFromLocalStorage() as string;

    this.store
      .select((user) => user.user._id)
      .subscribe((id) => {
        this.userId = id;
      });

    this.chatSubscription = this.store
      .select((state) => state.user)
      .subscribe((user) => {
        let result: PatientModel | ProfessionalModel;

        if (user.role === 'Professional') {
          result = user.patients?.find(
            (patient) => patient.refData._id === this.id
          ) as PatientModel;
        } else {
          result = user.professionals?.find(
            (professional) => professional.refData._id === this.id
          ) as ProfessionalModel;
        }

        this.data = result?.chatRef;

        this.data?.messages.forEach((message) => {
          if (message.to === this.userId && message.read === false) {
            this.chatService.toggleMessage(message._id, token).subscribe(() => {
              this.store.dispatch(updateMessageReadState({ message: message }));
            });
          }
        });
      });

    /* setInterval(() => {
      this.authService.loginWithToken(token).subscribe((data) => {
        this.store.dispatch(loginUser({ userInfo: data }));
      });
    }, 10000); */
  }

  sendMessage() {
    const token = this.tokenService.getTokenFromLocalStorage() as string;
    this.chatService
      .addMessageToChat(this.data._id, this.id, this.newMessage, token)
      .subscribe((data) => {
        this.store.dispatch(addMessageToChat({ message: data }));
        this.socket.sendMessage(data);
        this.newMessage = '';
      });
  }

  ngOnDestroy(): void {
    this.chatSubscription.unsubscribe();
  }
}
