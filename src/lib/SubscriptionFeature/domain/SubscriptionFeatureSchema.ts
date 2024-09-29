import { featureSchema } from '@/lib/Feature/domain/FeatureSchema';
import * as S from '@effect/schema/Schema';

export const subscriptionFeatureSchema = S.Struct({
  id: S.String,
  createdAt: S.Date,
  enabled: S.Boolean,
  max: S.Number,
  featureId: S.optional(S.String),
  feature: S.optional(featureSchema.pick('id', 'description', 'name')),
  subscriptionId: S.optional(S.String),
  subscription: S.optional(
    S.Struct({
      id: S.String,
    }),
  ),
});

export type SubscriptionFeatureType = S.Schema.Type<
  typeof subscriptionFeatureSchema
>;

export const subscriptionFeatureCreateSchema = subscriptionFeatureSchema.pick(
  'max',
  'enabled',
  'feature',
  'subscription',
);

export type SubscriptionFeatureCreateType = S.Schema.Type<
  typeof subscriptionFeatureCreateSchema
>;

export const subscriptionUpdateSchema = subscriptionFeatureSchema.pick(
  'featureId',
  'max',
  'enabled',
);

export type SubscriptionUpdateType = S.Schema.Type<
  typeof subscriptionUpdateSchema
>;
