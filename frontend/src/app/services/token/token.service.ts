import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  loadTokenToLocalStorage(token: string) {
    localStorage.setItem('token', token);
  }

  getTokenFromLocalStorage() {
    return localStorage.getItem('token');
  }

  deleteTokenFromLocalStorage() {
    localStorage.removeItem('token');
  }
}
