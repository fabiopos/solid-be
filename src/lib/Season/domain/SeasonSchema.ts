import { SeasonStatusEnum } from '@/shared/enums/seasonStatusEnum';
import * as S from '@effect/schema/Schema';

export const seasonSchema = S.Struct({
  id: S.optional(S.String),
  teamId: S.optional(S.String),
  team: S.optional(
    S.Struct({
      id: S.String,
      name: S.String,
    }),
  ),
  name: S.optional(S.String),
  status: S.optional(S.Enums(SeasonStatusEnum)),
  active: S.optional(S.Boolean),
  description: S.optional(S.String),
  createdAt: S.optional(S.Date),
  startDate: S.optional(S.Date),
  endDate: S.optional(S.Date),
  competitions: S.optional(
    S.Array(
      S.Struct({
        id: S.String,
        name: S.String,
      }),
    ),
  ),
});

//
export type SeasonType = S.Schema.Type<typeof seasonSchema>;

export class FulfilledSeason extends S.TaggedClass<FulfilledSeason>()(
  'FulfilledSeason',
  {
    ...seasonSchema.fields,
  },
) {}

export class EmptySeason extends S.TaggedClass<EmptySeason>()('EmptySeason', {
  teamId: S.String,
  name: seasonSchema.fields.name,
  startDate: seasonSchema.fields.startDate,
  endDate: seasonSchema.fields.endDate,
  active: seasonSchema.fields.active,
  description: seasonSchema.fields.description,
}) {}
