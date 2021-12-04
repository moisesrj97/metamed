import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';

describe('Given TokenService', () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenService);
    localStorage.setItem('token', 'TOKENTEST');
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('When it is instantiated', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('When service.loadTokenToLocalStorage', () => {
    it("Should save token in localStorage under the key 'token'", () => {
      service.loadTokenToLocalStorage('token');
      expect(localStorage.getItem('token')).toBe('token');
    });
  });

  describe('When service.getTokenFromLocalStorage', () => {
    it('Should return token from localStorage', () => {
      const response = service.getTokenFromLocalStorage();
      expect(response).toBe('TOKENTEST');
    });
  });

  describe('When service.deleteTokenFromLocalStorage', () => {
    it('Should delete token from localStorage', () => {
      service.deleteTokenFromLocalStorage();
      expect(localStorage.getItem('token')).toBe(null);
    });
  });
});
