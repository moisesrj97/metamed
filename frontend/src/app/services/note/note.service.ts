import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStore } from 'src/app/models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  baseUrl: string = 'http://localhost:3000/note';
  constructor(private httpClient: HttpClient) {}

  addNoteToPatient(
    patientId: string,
    noteName: string,
    token: string
  ): Observable<UserStore> {
    return this.httpClient.post(
      `${this.baseUrl}`,
      {
        patient: patientId,
        title: noteName,
      },
      { headers: new HttpHeaders().set('Authorization', 'Bearer ' + token) }
    ) as Observable<UserStore>;
  }

  updateNoteName(
    noteId: string,
    newNoteName: string,
    newNoteDescription: string,
    token: string
  ): Observable<UserStore> {
    return this.httpClient.patch(
      `${this.baseUrl}/${noteId}`,
      {
        title: newNoteName,
        description: newNoteDescription,
      },
      { headers: new HttpHeaders().set('Authorization', 'Bearer ' + token) }
    ) as Observable<UserStore>;
  }

  getNote(noteId: string, token: string): Observable<UserStore> {
    return this.httpClient.get(`${this.baseUrl}/${noteId}`, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
    }) as Observable<UserStore>;
  }

  deleteNote(noteId: string, token: string): Observable<UserStore> {
    return this.httpClient.delete(`${this.baseUrl}/${noteId}`, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
    }) as Observable<UserStore>;
  }
}
