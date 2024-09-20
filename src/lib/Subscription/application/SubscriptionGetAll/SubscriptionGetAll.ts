import { SubscriptionRepository } from '../../domain/SubscriptionRepository';

export class SubscriptionGetAll {
  constructor(private subscriptionRepository: SubscriptionRepository) {}

  async run() {
    const result = await this.subscriptionRepository.getAll();
    console.log('entra al RUN', result);
    return result;
  }
}
