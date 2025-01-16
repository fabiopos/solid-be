import { SubscriptionFeatureRepository } from '../../domain/subscription-feature-repository';
import {
  SubscriptionFeatureCreateType,
  SubscriptionFeatureType,
} from '../../domain/subscription-feature.schema';

export class SubscriptionFeatureAdd {
  constructor(private repository: SubscriptionFeatureRepository) {}

  async run(
    featureToAdd: SubscriptionFeatureCreateType,
  ): Promise<SubscriptionFeatureType> {
    return await this.repository.create(featureToAdd);
  }
}
