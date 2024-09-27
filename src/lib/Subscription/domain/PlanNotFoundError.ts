import { BadRequestException } from '@nestjs/common';

export class PlanNotFoundError extends BadRequestException {
  constructor() {
    super('Plan not found');
  }
}
