import { CreateTeamPayload } from '@/lib/Team/infrastructure/NestJs/Validations';
import { CreateUserPayload } from '@/lib/User/infrastructure/NestJs/CreateUserPayload';
import {
  IsNotEmptyObject,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class SubscriptionCreatePayload {
  @IsString()
  @Length(5, 50)
  @IsOptional()
  paymentId: string;

  @IsString()
  planId: string;

  @IsNotEmptyObject()
  team: CreateTeamPayload;

  @IsNotEmptyObject()
  user: CreateUserPayload;
}
