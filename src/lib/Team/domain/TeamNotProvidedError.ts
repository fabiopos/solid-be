import { BadRequestException } from '@nestjs/common';

export class TeamNotProvidedError extends BadRequestException {
  constructor() {
    super('You must provide at least one team');
  }
}
