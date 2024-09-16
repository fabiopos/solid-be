import { SubscriptionRepository } from '@/lib/Subscription/domain/SubscriptionRepository';

export class SubscriptionRepositoryMock implements SubscriptionRepository {
  async create(payload: any) {
    return payload;
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
