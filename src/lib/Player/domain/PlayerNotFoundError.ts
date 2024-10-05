import { NotFoundException } from '@nestjs/common';

export class PlayerNotFoundError extends NotFoundException {}
