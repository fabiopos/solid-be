import { SubscriptionRepository } from '../../domain/SubscriptionRepository';

export class SubscriptionFind {
  constructor(private repository: SubscriptionRepository) {}

  async run(id: string) {
    const sub = await this.repository.getOneById(id);
    return sub;
  }
}
