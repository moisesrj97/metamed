import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mergeMap, Observable } from 'rxjs';
import { UserStore } from 'src/app/models/interfaces';
import { environment } from 'src/environments/environment';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  baseUrl: string = `${environment.backendUrl}login/`;
  getUrl: string = `${environment.backendUrl}`;
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  loginWithoutToken(
    email: string,
    password: string,
    role: string
  ): Observable<string> {
    let fetchedToken: string;
    return this.http
      .post(
        this.baseUrl + role,
        {
          email,
          password,
        },
        { responseType: 'text' }
      )
      .pipe(
        mergeMap((token: any) => {
          fetchedToken = token;
          this.tokenService.loadTokenToLocalStorage(fetchedToken);
          return this.http.post(
            `${this.baseUrl}token`,
            {},
            {
              headers: new HttpHeaders().set(
                'Authorization',
                `Bearer ${token}`
              ),
            }
          );
        }),
        mergeMap((tokenObject: any) => {
          return this.http.get(
            `${this.getUrl}${tokenObject.role}/${tokenObject.id}`,
            {
              headers: new HttpHeaders().set(
                'Authorization',
                `Bearer ${fetchedToken}`
              ),
            }
          );
        })
      ) as Observable<string>;
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
        mergeMap((tokenObject: any) => {
          return this.http.get(
            `${this.getUrl}${tokenObject.role}/${tokenObject.id}`,
            {
              headers: new HttpHeaders().set(
                'Authorization',
                `Bearer ${token}`
              ),
            }
          );
        })
      ) as Observable<UserStore>;
  }
}
