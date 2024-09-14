import { CreateTeamPayload } from '@/lib/Team/infrastructure/NestJs/Validations';
import { CreateUserPayload } from '@/lib/User/infrastructure/NestJs/CreateUserPayload';
import { Type } from 'class-transformer';
import {
  IsNotEmptyObject,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

export class SubscriptionCreatePayload {
  @IsString()
  @Length(5, 50)
  @IsOptional()
  paymentId: string;

  @IsString()
  planId: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateTeamPayload)
  team: CreateTeamPayload;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateUserPayload)
  user: CreateUserPayload;
}
