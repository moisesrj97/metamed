import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MealGroupModel, UserStore } from 'src/app/models/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MealGroupService {
  baseUrl: string = `${environment.backendUrl}meal-group`;
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
    newMealExtraInfo: string,
    token: string
  ): Observable<UserStore> {
    return this.httpClient.patch(
      `${this.baseUrl}/${mealGroupId}`,
      {
        name: newMealGroupName,
        extra: newMealExtraInfo,
      },
      { headers: new HttpHeaders().set('Authorization', 'Bearer ' + token) }
    ) as Observable<UserStore>;
  }

  getMealGroup(mealGroupId: string, token: string): Observable<MealGroupModel> {
    return this.httpClient.get(`${this.baseUrl}/${mealGroupId}`, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
    }) as Observable<MealGroupModel>;
  }

  deleteMealGroup(
    mealGroupId: string,
    patientId: string,
    token: string
  ): Observable<UserStore> {
    return this.httpClient.delete(
      `${this.baseUrl}/${mealGroupId}/${patientId}`,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
      }
    ) as Observable<UserStore>;
  }
}
