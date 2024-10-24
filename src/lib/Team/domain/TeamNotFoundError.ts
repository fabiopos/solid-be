import { NotFoundException } from '@nestjs/common';

export class TeamNotFoundError extends NotFoundException {
  constructor() {
    super('Team not found');
  }
}
