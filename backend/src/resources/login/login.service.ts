import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginService {
  loginWithToken(token: string) {
    return 'This action adds a new login';
  }

  loginWithoutToken(email: string, password: string) {
    return `This action returns all login`;
  }
}
