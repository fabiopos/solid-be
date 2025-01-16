import { CreateTeamPayload } from '@/lib/team/infrastructure/NestJs/Validations';
import { CreateUserPayload } from '@/lib/user/infrastructure/NestJs/CreateUserPayload';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmptyObject,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  ValidateNested,
} from 'class-validator';

export class SubscriptionCreatePayload {
  @ApiProperty()
  @IsString()
  @Length(5, 50)
  @IsOptional()
  paymentId: string;

  @ApiProperty()
  @IsString()
  planId: string;

  @ApiProperty()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateTeamPayload)
  team: CreateTeamPayload;

  @ApiProperty()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateUserPayload)
  user: CreateUserPayload;
}

export class SubscriptionParams {
  @IsUUID('all', { each: true })
  id: string;
}
