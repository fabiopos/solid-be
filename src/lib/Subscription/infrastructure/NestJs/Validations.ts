import { IsOptional, IsString, Length } from 'class-validator';

export class SubscriptionCreatePayload {
  @IsString()
  @Length(5, 50)
  teamId: string;

  @IsString()
  @Length(5, 50)
  @IsOptional()
  paymentId: string;

  @IsString()
  @Length(5, 50)
  @IsOptional()
  planId: string;
}
