import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatRefModel, MessageModel } from 'src/app/models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private httpClient: HttpClient) {}

  addMessageToChat(
    chatId: string,
    to: string,
    text: string,
    token: string
  ): Observable<MessageModel> {
    return this.httpClient.patch(
      `http://localhost:3000/chat/${chatId}`,
      {
        to,
        text,
      },
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
      }
    ) as Observable<MessageModel>;
  }

  toggleMessage(messageId: string, token: string): Observable<MessageModel> {
    return this.httpClient.patch(
      'http://localhost:3000/message/' + messageId,
      {},
      { headers: new HttpHeaders().set('Authorization', 'Bearer ' + token) }
    ) as Observable<MessageModel>;
  }
}
