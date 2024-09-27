import { SubscriptionRepository } from '../../domain/SubscriptionRepository';
import { FulfilledSubscription } from '../../domain/SubscriptionSchema';
export class SubscriptionFind {
  constructor(private repository: SubscriptionRepository) {}

  async run(id: string): Promise<FulfilledSubscription> {
    return this.repository.getOneById(id);
  }
}
