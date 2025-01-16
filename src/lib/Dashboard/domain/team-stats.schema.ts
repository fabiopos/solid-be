import { Schema as S } from '@effect/schema';

export const teamStatsSchema = S.Struct({
  won: S.Number,
  drawn: S.Number,
  lost: S.Number,
  seasonsCount: S.Number,
  competitionsCount: S.Number,
  matchesCount: S.Number,
});

export type TeamStatsType = S.Schema.Type<typeof teamStatsSchema>;

export class FulfilledTeamStats extends S.TaggedClass<FulfilledTeamStats>()(
  'FulfilledTeamStats',
  {
    ...teamStatsSchema.fields,
  },
) {}
