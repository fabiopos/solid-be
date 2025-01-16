import { InternalServerErrorException } from '@nestjs/common';

export class UserEncryptError extends InternalServerErrorException {
  constructor(message: string) {
    super(message);
  }
}
