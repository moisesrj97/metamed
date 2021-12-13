import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStore } from 'src/app/models/interfaces';
import { environment } from 'src/environments/environment';

export interface RegisterProfessionalFormData {
  name: string;
  surname: string;
  businessName: string;
  email: string;
  password: string;
  profilePicture: string;
}

export interface RegisterPatientFormData {
  name: string;
  surname: string;
  gender: string;
  birthDate: string;
  email: string;
  password: string;
  profilePicture: string;
}

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private httpClient: HttpClient) {}

  registerProfessional(
    formData: RegisterProfessionalFormData
  ): Observable<UserStore> {
    const multipartFormData = new FormData();
    multipartFormData.set('name', formData.name);
    multipartFormData.set('surname', formData.surname);
    multipartFormData.set('businessName', formData.businessName);
    multipartFormData.set('email', formData.email);
    multipartFormData.set('password', formData.password);
    multipartFormData.append(
      'profilePicture',
      formData.profilePicture,
      'image'
    );

    return this.httpClient.post(
      `${environment.backendUrl}professional`,
      multipartFormData
    ) as Observable<UserStore>;
  }

  registerPatient(formData: RegisterPatientFormData): Observable<UserStore> {
    const multipartFormData = new FormData();
    multipartFormData.set('name', formData.name);
    multipartFormData.set('surname', formData.surname);
    multipartFormData.set('gender', formData.gender);
    multipartFormData.set('birthDate', formData.birthDate);
    multipartFormData.set('email', formData.email);
    multipartFormData.set('password', formData.password);
    multipartFormData.append(
      'profilePicture',
      formData.profilePicture,
      'image'
    );

    return this.httpClient.post(
      `${environment.backendUrl}patient`,
      multipartFormData
    ) as Observable<UserStore>;
  }
}
