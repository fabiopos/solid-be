import { NotFoundException } from '@nestjs/common';

export class PlanNotFoundError extends NotFoundException {
  constructor() {
    super('Plan not found');
  }
}
