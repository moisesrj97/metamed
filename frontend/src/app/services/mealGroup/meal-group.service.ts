import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStore } from 'src/app/models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class MealGroupService {
  baseUrl: string = 'http://localhost:3000/meal-group';
  constructor(private httpClient: HttpClient) {}

  addMealGroupToPatient(
    patientId: string,
    mealGroupName: string,
    token: string
  ): Observable<UserStore> {
    return this.httpClient.post(
      `${this.baseUrl}`,
      {
        patient: patientId,
        name: mealGroupName,
      },
      { headers: new HttpHeaders().set('Authorization', 'Bearer ' + token) }
    ) as Observable<UserStore>;
  }

  updateMealGroupName(
    mealGroupId: string,
    newMealGroupName: string,
    token: string
  ): Observable<UserStore> {
    return this.httpClient.patch(
      `${this.baseUrl}/${mealGroupId}`,
      {
        name: newMealGroupName,
      },
      { headers: new HttpHeaders().set('Authorization', 'Bearer ' + token) }
    ) as Observable<UserStore>;
  }

  getMealGroup(mealGroupId: string, token: string): Observable<UserStore> {
    return this.httpClient.get(`${this.baseUrl}/${mealGroupId}`, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
    }) as Observable<UserStore>;
  }

  deleteMealGroup(mealGroupId: string, token: string): Observable<UserStore> {
    return this.httpClient.delete(`${this.baseUrl}/${mealGroupId}`, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
    }) as Observable<UserStore>;
  }
}
