import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStore } from 'src/app/models/interfaces';
import { updateUserBasicData } from '../store/actions/user.actions';

interface UpdateUserInfoDto {
  name: string;
  surname: string;
  profilePicture: string;
  businessName?: string;
  gender?: string;
  birthDate?: string;
  file?: string;
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
    const multipartFormData = new FormData();
    console.log(id, role, updateUserInfoDto);
    multipartFormData.set('name', updateUserInfoDto.name);
    multipartFormData.set('surname', updateUserInfoDto.surname);
    multipartFormData.set('profilePicture', updateUserInfoDto.profilePicture);

    if (updateUserInfoDto.businessName) {
      multipartFormData.set('businessName', updateUserInfoDto.businessName);
    }
    if (updateUserInfoDto.gender) {
      multipartFormData.set('gender', updateUserInfoDto.gender);
    }
    if (updateUserInfoDto.birthDate) {
      multipartFormData.set('birthDate', updateUserInfoDto.birthDate);
    }
    if (updateUserInfoDto.file) {
      multipartFormData.append('file', updateUserInfoDto.file, 'image');
    }

    return this.httpClient.patch(
      `http://localhost:3000/${role}/${id}`,
      multipartFormData,
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      }
    ) as Observable<UserStore>;
  }
}
