import { BadRequestException } from '@nestjs/common';

export class UserInvalidError extends BadRequestException {
  constructor(message: string) {
    super(message);
  }
}
