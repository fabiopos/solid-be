import { SubscriptionFeatureRepository } from '../../domain/SubscriptionFeatureRepository';
import {
  SubscriptionFeatureCreateType,
  SubscriptionFeatureType,
} from '../../domain/SubscriptionFeatureSchema';

export class SubscriptionFeatureAdd {
  constructor(private repository: SubscriptionFeatureRepository) {}

  async run(
    featureToAdd: SubscriptionFeatureCreateType,
  ): Promise<SubscriptionFeatureType> {
    return await this.repository.create(featureToAdd);
  }
}
