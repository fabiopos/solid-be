import { BadRequestException } from '@nestjs/common';

export class UserNoPolicyError extends BadRequestException {
  constructor() {
    super('You must accept the policy');
  }
}
