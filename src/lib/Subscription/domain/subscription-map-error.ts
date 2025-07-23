import { InternalServerErrorException } from '@nestjs/common';

export class SubscriptionMapError extends InternalServerErrorException {
  constructor(message: string) {
    super(message);
  }
}
