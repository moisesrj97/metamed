import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mergeMap, Observable } from 'rxjs';
import { JwtModel, UserStore } from 'src/app/models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  baseUrl: string = 'http://localhost:3000/login/';
  constructor(private http: HttpClient) {}

  loginProfessionalWithoutToken(
    email: string,
    password: string
  ): Observable<Object> {
    return this.http.post(this.baseUrl + 'professional', {
      email,
      password,
    });
  }

  loginPatientWithoutToken(
    email: string,
    password: string
  ): Observable<Object> {
    return this.http.post(this.baseUrl + 'patient', {
      email,
      password,
    });
  }

  loginWithToken(token: string): Observable<UserStore> {
    return this.http
      .post(
        this.baseUrl + 'token',
        {},
        {
          headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
        }
      )
      .pipe(
        mergeMap((tokenObject: any) =>
          this.http.get(
            'http://localhost:3000/professional/' + tokenObject.id,
            {
              headers: new HttpHeaders().set(
                'Authorization',
                `Bearer ${token}`
              ),
            }
          )
        )
      ) as Observable<UserStore>;
  }
}
