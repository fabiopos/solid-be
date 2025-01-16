import { SubscriptionRepository } from '../../domain/subscription.repository';

export class SubscriptionGetAll {
  constructor(private subscriptionRepository: SubscriptionRepository) {}

  async run() {
    const result = await this.subscriptionRepository.getAll();
    return result;
  }
}
