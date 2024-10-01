import { BadRequestException } from '@nestjs/common';

export class PlayerInvalidError extends BadRequestException {
  constructor(message: string) {
    super(message);
  }
}
