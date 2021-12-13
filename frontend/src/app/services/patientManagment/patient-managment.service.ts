import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExtraDataModel, UserStore } from 'src/app/models/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PatientManagmentService {
  baseUrl = `${environment.backendUrl}professional`;
  constructor(private httpClient: HttpClient) {}

  addPatientToList(
    professionalId: string,
    patientId: string,
    token: string
  ): Observable<UserStore> {
    return this.httpClient.post(
      `${this.baseUrl}/${professionalId}/patients`,
      { patientId },
      { headers: new HttpHeaders().set('Authorization', `Bearer ${token}`) }
    ) as Observable<UserStore>;
  }

  updateExtraDataFromPatient(
    professionalId: string,
    patientId: string,
    updatedData: ExtraDataModel[],
    token: string
  ): Observable<UserStore> {
    return this.httpClient.patch(
      `${this.baseUrl}/${professionalId}/patients/${patientId}`,
      {
        allExtraDataUpdated: updatedData,
      },
      { headers: new HttpHeaders().set('Authorization', `Bearer ${token}`) }
    ) as Observable<UserStore>;
  }

  removePatientFromList(
    professionalId: string,
    patientId: string,
    token: string
  ): Observable<UserStore> {
    return this.httpClient.delete(
      `${this.baseUrl}/${professionalId}/patients/${patientId}`,
      { headers: new HttpHeaders().set('Authorization', `Bearer ${token}`) }
    ) as Observable<UserStore>;
  }
}
