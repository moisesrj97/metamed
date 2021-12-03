import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}
  loadTokenToLocalStorage(token: string) {
    localStorage.setItem('token', token);
  }

  getTokenFromLocalStorage() {
    return localStorage.getItem('token');
  }
}
