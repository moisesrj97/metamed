import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NoteModel, UserStore } from 'src/app/models/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  baseUrl: string = `${environment.backendUrl}note`;
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

  getNote(noteId: string, token: string): Observable<NoteModel> {
    return this.httpClient.get(`${this.baseUrl}/${noteId}`, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
    }) as Observable<NoteModel>;
  }

  deleteNote(
    noteId: string,
    patientId: string,
    token: string
  ): Observable<NoteModel> {
    return this.httpClient.delete(`${this.baseUrl}/${noteId}/${patientId}`, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
    }) as Observable<NoteModel>;
  }
}
