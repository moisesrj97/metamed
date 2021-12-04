import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStore } from 'src/app/models/interfaces';

interface UpdateUserInfoDto {
  name: string;
  surname: string;
  profilePicture: string;
  businessName?: string;
  gender?: string;
  birthDate?: string;
  file?: File;
}

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  constructor(private httpClient: HttpClient) {}
  update(
    id: string,
    role: string,
    updateUserInfoDto: UpdateUserInfoDto,
    token: string
  ): Observable<UserStore> {
    return this.httpClient.patch(
      `http://localhost:3000/${role}/${id}`,
      updateUserInfoDto,
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      }
    ) as Observable<UserStore>;
  }
}
