import { IsEmail, IsPhoneNumber, IsString, MaxLength } from 'class-validator';

export class AuthLoginPayload {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class TwoFactorAuthPayload {
  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phone: string;

  @IsString()
  teamId: string;
}

export class TwoFactorVerifyPayload {
  @IsString()
  phone: string;

  @IsString()
  @MaxLength(6)
  code: string;
}
