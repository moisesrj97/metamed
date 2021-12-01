import { Controller, Post, Body, Headers } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('professional/token')
  loginProfessionalWithToken(@Headers('Authorization') token: string) {
    console.log(token);
    return this.loginService.loginProfessionalWithToken(token);
  }

  @Post('professional/')
  loginProfessionalWithoutToken(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.loginService.loginProfessionalWithoutToken(email, password);
  }

  @Post('patient/token')
  loginPatientWithToken(@Headers('Authorization') token: string) {
    return this.loginService.loginPatientWithToken(token);
  }

  @Post('patient/')
  loginPatientWithoutToken(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.loginService.loginPatientWithoutToken(email, password);
  }
}
