import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthLogin } from '../../application/Login/AuthLogin';
import { AuthLogout } from '../../application/Logout/AuthLogout';
import { AuthLoginPayload } from './AuthLoginPayload';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AuthLogin')
    private readonly authLogin: AuthLogin,
    private readonly authLogout: AuthLogout,
  ) {}

  @Post('/login')
  login(@Body() credentials: AuthLoginPayload) {
    return this.authLogin.run(credentials);
  }

  @Post('/logout')
  logout() {
    this.authLogout.run();
  }
}
