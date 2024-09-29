import {
  SubscriptionFeatureCreateType,
  SubscriptionFeatureType,
  SubscriptionUpdateType,
} from './SubscriptionFeatureSchema';

export interface SubscriptionFeatureRepository {
  create(
    subFeature: SubscriptionFeatureCreateType,
  ): Promise<SubscriptionFeatureType>;

  createItems(
    subFeature: SubscriptionFeatureCreateType[],
  ): Promise<SubscriptionFeatureType[]>;

  getAll(): Promise<SubscriptionFeatureType[]>;
  getOneById(id: string): Promise<SubscriptionFeatureType>;
  edit(id: string, payload: SubscriptionUpdateType): Promise<void>;
  delete(id: string): Promise<void>;
}
