import { CreateSubscriptionDto } from '@/shared/dto/CreateSubscriptionDto';
import { SubscriptionRepository } from '../../domain/SubscriptionRepository';
import { Subscription } from '../../domain/Subscription';

export class SubscriptionCreate {
  constructor(private repository: SubscriptionRepository) {}

  async run(dto: CreateSubscriptionDto): Promise<void> {
    const subscription = Subscription.create(dto);
    this.repository.create(subscription);
  }
}
