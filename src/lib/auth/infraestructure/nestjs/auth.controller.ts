import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthLogin } from '../../application/login/auth-login';
import {
  AuthLoginPayload,
  TwoFactorAuthPayload,
  TwoFactorVerifyPayload,
} from './auth-login-payload';
import { QueryTeamInvitePayload } from 'src/lib/team/infrastructure/NestJs/Validations';

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

  @Post('/2fa')
  createTwoFactorAuth(@Body() { email, phone, teamId }: TwoFactorAuthPayload) {
    return this.authLogin.createTwoFactorAuth(email, phone, teamId);
  }

  @Post('/2fa/verify')
  verifyTwoFactorAuth(@Body() { code, phone }: TwoFactorVerifyPayload) {
    // Placeholder for 2FA logic
    return this.authLogin.verifyTwoFactorAuth(phone, code);
  }

  @Get('/invite')
  query(@Query() params: QueryTeamInvitePayload) {
    // Placeholder for 2FA logic
    return this.authLogin.getTwoFactorDeps(params);
  }
}
