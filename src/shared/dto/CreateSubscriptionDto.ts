import { Plan } from '@/lib/Plan/domain/Plan';
import { CreateTeamDto } from './CreateTeamDto';
import { CreateUserDto } from './CreateUserDto';

export class CreateSubscriptionDto {
  teams: CreateTeamDto[];
  paymentId: string;
  planId: string;
  user: CreateUserDto;
  plan?: Plan;
}
