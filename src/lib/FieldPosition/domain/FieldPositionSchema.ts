import { Schema as S } from '@effect/schema';

export const fieldPositionSchema = S.Struct({
  id: S.optional(S.String),
  createdAt: S.optional(S.Date),
  name: S.optional(S.String),
  description: S.optional(S.NullishOr(S.String)),
  order: S.optional(S.Number),
});

export type FieldPositionType = S.Schema.Type<typeof fieldPositionSchema>;
