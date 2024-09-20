import { IsEmail } from 'class-validator';

export class NewUserValidatePayload {
  @IsEmail()
  email: string;
}
