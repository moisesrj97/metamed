import { Controller, Post, Body, Headers } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('token')
  loginProfessionalWithToken(@Headers('Authorization') token: string) {
    return this.loginService.loginWithToken(token);
  }

  @Post('professional/')
  loginProfessionalWithoutToken(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.loginService.loginWithoutToken('Professional', email, password);
  }

  @Post('patient/')
  loginPatientWithoutToken(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.loginService.loginWithoutToken('Patient', email, password);
  }
}
