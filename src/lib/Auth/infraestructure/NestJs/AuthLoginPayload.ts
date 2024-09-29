import { IsEmail, IsString } from 'class-validator';

export class AuthLoginPayload {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
