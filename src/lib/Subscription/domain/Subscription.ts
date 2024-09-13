import { CreateSubscriptionDto } from '@/shared/dto/CreateSubscriptionDto';
import { TypeOrmSubscriptionEntity } from '../infrastructure/TypeOrm/TypeOrmSubscriptionEntity';
import { User } from '@/lib/User/domain/User';
import { Team } from '@/lib/Team/domain/Team';

export class Subscription {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  active: boolean;
  paymentId: string | undefined;
  planId: string | undefined;
  teams: Team[];
  users: User[];

  static generateName({ planId }: CreateSubscriptionDto): string {
    return `${'subscription-name-'}${planId}`;
  }

  static calculateEndDate({ planId }: CreateSubscriptionDto): Date {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30); // 30 days
    console.log({ planId });
    return endDate;
  }

  static create(dto: CreateSubscriptionDto): Subscription {
    const subscription = new Subscription();
    subscription.planId = dto.planId;
    // subscription.paymentId = dto.paymentId;
    subscription.startDate = new Date(); // today
    subscription.users = [dto.user];
    subscription.name = this.generateName(dto); // generate this name
    subscription.endDate = this.calculateEndDate(dto); // today + planId duration
    subscription.active = true;

    return subscription;
  }

  static fromPrimitives(dto: TypeOrmSubscriptionEntity): Subscription {
    const subscription = new Subscription();
    subscription.planId = dto.plan.id;
    subscription.teams = dto.teams;
    subscription.paymentId = dto.payment.id;
    subscription.startDate = dto.startDate; // today
    subscription.name = dto.name;
    subscription.endDate = dto.endDate;
    subscription.active = dto.active;
    subscription.createdAt = dto.createdAt;
    return subscription;
  }
}
