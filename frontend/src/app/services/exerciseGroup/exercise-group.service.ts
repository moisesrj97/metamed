import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExerciseGroupModel, UserStore } from 'src/app/models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ExerciseGroupService {
  baseUrl: string = 'http://localhost:3000/exercise-group';
  constructor(private httpClient: HttpClient) {}

  addExerciseGroupToPatient(
    patientId: string,
    exerciseGroupName: string,
    token: string
  ): Observable<UserStore> {
    return this.httpClient.post(
      `${this.baseUrl}`,
      {
        patient: patientId,
        name: exerciseGroupName,
      },
      { headers: new HttpHeaders().set('Authorization', 'Bearer ' + token) }
    ) as Observable<UserStore>;
  }

  updateExerciseGroupName(
    exerciseGroupId: string,
    token: string,
    newExerciseGroupName?: string,
    newExerciseExtraInfo?: string
  ): Observable<UserStore> {
    console.log(newExerciseGroupName, newExerciseExtraInfo);
    return this.httpClient.patch(
      `${this.baseUrl}/${exerciseGroupId}`,
      {
        name: newExerciseGroupName,
        extra: newExerciseExtraInfo,
      },
      { headers: new HttpHeaders().set('Authorization', 'Bearer ' + token) }
    ) as Observable<UserStore>;
  }

  getExerciseGroup(
    exerciseGroupId: string,
    token: string
  ): Observable<ExerciseGroupModel> {
    return this.httpClient.get(`${this.baseUrl}/${exerciseGroupId}`, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
    }) as Observable<ExerciseGroupModel>;
  }

  deleteExerciseGroup(
    exerciseGroupId: string,
    token: string
  ): Observable<UserStore> {
    return this.httpClient.delete(`${this.baseUrl}/${exerciseGroupId}`, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
    }) as Observable<UserStore>;
  }
}
