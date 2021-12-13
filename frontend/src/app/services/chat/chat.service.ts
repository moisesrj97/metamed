import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageModel } from 'src/app/models/interfaces';
import { environment } from 'src/environments/environment';

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
      `${environment.backendUrl}chat/${chatId}`,
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
      environment.backendUrl + 'message/' + messageId,
      {},
      { headers: new HttpHeaders().set('Authorization', 'Bearer ' + token) }
    ) as Observable<MessageModel>;
  }
}
