import { SubscriptionFeatureRepository } from '../lib/subscription-feature/domain/subscription-feature-repository';
import {
  SubscriptionFeatureCreateType,
  SubscriptionFeatureType,
} from '../lib/subscription-feature/domain/subscription-feature.schema';

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
