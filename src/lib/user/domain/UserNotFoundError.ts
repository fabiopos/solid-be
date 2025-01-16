import { NotFoundException } from '@nestjs/common';

export class UserNotFoundError extends NotFoundException {}
