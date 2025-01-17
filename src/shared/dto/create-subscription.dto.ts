import { Plan } from '../../lib/plan/domain/plan';
import { CreateTeamDto } from './create-team.dto';
import { CreateUserDto } from './create-user.dto';

export class CreateSubscriptionDto {
  teams: CreateTeamDto[];
  paymentId: string;
  planId: string;
  user: CreateUserDto;
  plan?: Plan;
}
