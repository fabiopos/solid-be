import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthLogin } from '../../application/login/auth-login';
import { AuthLoginPayload } from './auth-login-payload';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AuthLogin')
    private readonly authLogin: AuthLogin,
  ) {}

  @Post('/login')
  login(@Body() credentials: AuthLoginPayload) {
    return this.authLogin.run(credentials);
  }
}
