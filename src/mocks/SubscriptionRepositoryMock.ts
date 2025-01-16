import { SubscriptionRepository } from '@/lib/subscription/domain/subscription.repository';
import { FulfilledSubscription } from '@/lib/subscription/domain/subscription.schema';

export class SubscriptionRepositoryMock implements SubscriptionRepository {
  async create(payload: any) {
    return FulfilledSubscription.make({
      ...payload,
      id: '123',
      active: true,
      createdAt: new Date(),
      endDate: new Date(),
      name: 'SubscriptionName',
      planId: 'FREE',
      startDate: new Date(),
    });
  }
  async getAll() {
    return [];
  }
  async getOneById(id: string) {
    return null;
  }
  async edit(payload: any) {
    return;
  }
  async delete(id: string) {
    return;
  }
}
