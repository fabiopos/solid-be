import * as S from '@effect/schema/Schema';

export const featureSchema = S.Struct({
  id: S.optional(S.String),
  name: S.optional(S.String),
  description: S.optional(S.String),
  defaultMax: S.Number,
  enabled: S.Boolean,
  createdAt: S.Date,
  updatedAt: S.Date,
});

export type FeatureT = S.Schema.Type<typeof featureSchema>;

export const featureUpdateSchema = featureSchema.pick('name', 'description');
export type FeatureToUpdate = S.Schema.Type<typeof featureUpdateSchema>;
