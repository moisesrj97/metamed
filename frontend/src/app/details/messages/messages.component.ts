import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  ChatRefModel,
  PatientModel,
  UserStore,
} from 'src/app/models/interfaces';
import { ChatService } from 'src/app/services/chat/chat.service';
import { addMessageToChat } from 'src/app/services/store/actions/chat.actions';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  id!: string;
  userId!: string;
  newMessage!: string;
  data: ChatRefModel = { _id: '', messages: [], professional: '', patient: '' };

  constructor(
    private route: ActivatedRoute,
    private store: Store<{ user: UserStore }>,
    private chatService: ChatService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.id = this.route.parent?.snapshot.paramMap.get('id') as string;
    this.store
      .select((user) => user.user._id)
      .subscribe((id) => {
        this.userId = id;
      });

    this.store
      .select((state) => state.user.patients)
      .subscribe((patients) => {
        const result = patients?.find(
          (patient) => patient.refData._id === this.id
        ) as PatientModel;

        this.data = result?.chatRef;
      });
  }

  sendMessage() {
    const token = this.tokenService.getTokenFromLocalStorage() as string;
    this.chatService
      .addMessageToChat(this.data._id, this.id, this.newMessage, token)
      .subscribe((data) => {
        this.store.dispatch(addMessageToChat({ message: data }));
        this.newMessage = '';
      });
  }
}
