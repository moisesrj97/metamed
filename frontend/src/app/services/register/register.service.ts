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
  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) {}

  registerProfessional(
    formData: RegisterProfessionalFormData
  ): Observable<UserStore> {
    return this.httpClient.post(
      'http://localhost:3000/professional',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    ) as Observable<UserStore>;
    //! Remember to call loginWithoutToken after this in order to get the token
  }

  registerPatient(formData: RegisterPatientFormData): Observable<UserStore> {
    return this.httpClient.post('http://localhost:3000/patient', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }) as Observable<UserStore>;
    //! Remember to call loginWithoutToken after this in order to get the token
  }
}
