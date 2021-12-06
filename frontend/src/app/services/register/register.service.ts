import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler/src/ml_parser/tokens';
import { Injectable } from '@angular/core';
import { mergeMap, Observable } from 'rxjs';
import { UserStore } from 'src/app/models/interfaces';
import { TokenService } from '../token/token.service';

export interface RegisterProfessionalFormData {
  name: string;
  surname: string;
  businessName: string;
  email: string;
  password: string;
  profilePicture: File;
}

export interface RegisterPatientFormData {
  name: string;
  surname: string;
  gender: string;
  birthDate: string;
  email: string;
  password: string;
  profilePicture: File;
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
      new Blob([formData.profilePicture]),
      formData.profilePicture.name
    );

    return this.httpClient.post(
      'http://localhost:3000/professional',
      multipartFormData
    ) as Observable<UserStore>;
    //! Remember to call loginWithoutToken after this in order to get the token
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
      new Blob([formData.profilePicture]),
      formData.profilePicture.name
    );

    return this.httpClient.post(
      'http://localhost:3000/patient',
      multipartFormData
    ) as Observable<UserStore>;
    //! Remember to call loginWithoutToken after this in order to get the token
  }
}
