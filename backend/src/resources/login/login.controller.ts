import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('token')
  loginWithToken(@Body('token') token: string) {
    return this.loginService.loginWithToken(token);
  }

  @Post()
  loginWithoutToken(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.loginService.loginWithoutToken(email, password);
  }
}
