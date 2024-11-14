import { seasonSchema } from '@/lib/Season/domain/SeasonSchema';
import { CompetitionStatusEnum } from '@/shared/enums/competitionStatusEnum';
import { Schema as S } from '@effect/schema';

export const competitionSchema = S.Struct({
  id: S.optional(S.String),
  createdAt: S.optional(S.Date),
  name: S.optional(S.String),
  startDate: S.optional(S.NullishOr(S.Date)),
  endDate: S.optional(S.NullishOr(S.Date)),
  status: S.optional(S.NullishOr(S.Enums(CompetitionStatusEnum))),
  description: S.optional(S.NullishOr(S.String)),
  season: S.optional(seasonSchema),
  seasonId: S.optional(S.NullishOr(S.String)),
  matches: S.optional(
    S.NullishOr(
      S.Array(
        S.Struct({
          id: S.optional(S.String),
        }),
      ),
    ),
  ),
});

export type CompetitionType = S.Schema.Type<typeof competitionSchema>;

export class FulfilledCompetition extends S.TaggedClass<FulfilledCompetition>()(
  'FulfilledCompetition',
  {
    ...competitionSchema.fields,
  },
) {}

export class EmptyCompetition extends S.TaggedClass<EmptyCompetition>()(
  'EmptyCompetition',
  {
    name: competitionSchema.fields.name,
    startDate: competitionSchema.fields.startDate,
    endDate: competitionSchema.fields.endDate,
    status: competitionSchema.fields.status,
    seasonId: competitionSchema.fields.seasonId,
    description: competitionSchema.fields.description,
  },
) {}
