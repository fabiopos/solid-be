import { SubscriptionRepository } from '../../domain/subscription.repository';
import { FulfilledSubscription } from '../../domain/subscription.schema';
export class SubscriptionFind {
  constructor(private repository: SubscriptionRepository) {}

  async run(id: string): Promise<FulfilledSubscription> {
    return this.repository.getOneById(id);
  }
}
