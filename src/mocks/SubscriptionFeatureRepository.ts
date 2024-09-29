import { SubscriptionFeatureRepository } from '@/lib/SubscriptionFeature/domain/SubscriptionFeatureRepository';
import {
  SubscriptionFeatureCreateType,
  SubscriptionFeatureType,
} from '@/lib/SubscriptionFeature/domain/SubscriptionFeatureSchema';

export class SubscriptionFeatureRepositoryMock
  implements SubscriptionFeatureRepository
{
  async createItems(
    subFeature: SubscriptionFeatureCreateType[],
  ): Promise<SubscriptionFeatureType[]> {
    return [];
  }
  async getAll() {
    return [];
  }
  async getOneById(id: string) {
    return null;
  }
  async create(payload: any) {
    return payload;
  }
  async edit(payload: any) {
    return;
  }
  async delete(id: string) {
    return;
  }
}
