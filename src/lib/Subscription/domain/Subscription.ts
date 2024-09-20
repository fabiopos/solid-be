import { CreateSubscriptionDto } from '@/shared/dto/CreateSubscriptionDto';
import { TypeOrmSubscriptionEntity } from '../infrastructure/TypeOrm/TypeOrmSubscriptionEntity';
import { User } from '@/lib/User/domain/User';
import { Team } from '@/lib/Team/domain/Team';
import { Plan } from '@/lib/Plan/domain/Plan';
import { add } from 'date-fns';

export class Subscription {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  active: boolean;
  paymentId?: string | undefined;
  planId?: string | undefined;
  teams: Team[];
  users: User[];
  plan: Plan;

  static generateName({ planId }: CreateSubscriptionDto): string {
    return `${'subscription-name-'}${planId}`;
  }

  static calculateEndDate({ interval, intervalCount }: Plan): Date {
    return add(new Date(), { [interval]: intervalCount });
  }

  static create(dto: CreateSubscriptionDto): Subscription {
    const subscription = new Subscription();
    subscription.planId = dto.planId;
    subscription.plan = dto.plan;
    // subscription.paymentId = dto.paymentId;
    subscription.startDate = new Date(); // today
    subscription.users = [dto.user];
    subscription.name = this.generateName(dto); // generate this name
    subscription.active = true;

    return subscription;
  }

  static fromPrimitives(dto: TypeOrmSubscriptionEntity): Subscription {
    const subscription = new Subscription();
    subscription.planId = dto.plan?.id;
    subscription.teams = dto.teams.map((x) => Team.create(x));
    subscription.paymentId = dto.payment?.id;
    subscription.startDate = dto.startDate; // today
    subscription.name = dto.name;
    subscription.endDate = dto.endDate;
    subscription.active = dto.active;
    subscription.createdAt = dto.createdAt;
    subscription.id = dto.id;
    subscription.plan = dto.plan;
    subscription.users = dto.users.map((x) => User.fromPrimitives(x));
    return subscription;
  }
}
