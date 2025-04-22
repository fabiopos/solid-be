import { SubscriptionFeatureRepository } from '../lib/subscription-feature/domain/subscription-feature-repository';
import {
  SubscriptionFeatureCreateType,
  SubscriptionFeatureType,
  SubscriptionUpdateType,
} from '../lib/subscription-feature/domain/subscription-feature.schema';

export class SubscriptionFeatureRepositoryMock
  implements SubscriptionFeatureRepository
{
  private _features: SubscriptionFeatureType[] = [];

  async create(
    payload: SubscriptionFeatureCreateType,
  ): Promise<SubscriptionFeatureType> {
    const newItem: SubscriptionFeatureType = {
      ...payload,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    this._features.push(newItem);
    return newItem;
  }

  async createItems(
    subFeatures: SubscriptionFeatureCreateType[],
  ): Promise<SubscriptionFeatureType[]> {
    const createdItems = subFeatures.map((sf) => ({
      ...sf,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    }));
    this._features.push(...createdItems);
    return createdItems;
  }

  async getAll(): Promise<SubscriptionFeatureType[]> {
    return this._features;
  }

  async getOneById(id: string): Promise<SubscriptionFeatureType> {
    const feature = this._features.find((f) => f.id === id);
    if (!feature) throw new Error('Not found');
    return feature;
  }

  async edit(id: string, payload: SubscriptionUpdateType): Promise<void> {
    const index = this._features.findIndex((f) => f.id === id);
    if (index !== -1) {
      this._features[index] = {
        ...this._features[index],
        ...payload,
      };
    }
  }

  async delete(id: string): Promise<void> {
    this._features = this._features.filter((f) => f.id !== id);
  }
}
