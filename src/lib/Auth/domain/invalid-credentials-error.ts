import { BadRequestException } from '@nestjs/common';

export class InvalidCredentialsError extends BadRequestException {
  constructor(message: string) {
    super(message);
  }
}
