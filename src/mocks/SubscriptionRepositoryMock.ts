import { SubscriptionRepository } from '../lib/subscription/domain/subscription.repository';
import { FulfilledSubscription } from '../lib/subscription/domain/subscription.schema';

export class SubscriptionRepositoryMock implements SubscriptionRepository {
  private _id: string;
  private _payload: any;

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
    this._id = id;
    return null;
  }

  async edit(payload: any) {
    this._payload = payload;
    return;
  }

  async delete(id: string) {
    this._id = id;
    return;
  }

  reset(): void {}
}
