import { matchSchema } from '@/lib/Match/domain/MatchSchema';
import { playerSchema } from '@/lib/Player/domain/PlayerSchema';
import * as S from '@effect/schema/Schema';

const matchItem = matchSchema.pick('id', 'title', 'completed');
const playerItem = playerSchema.pick(
  'id',
  'firstName',
  'lastName',
  'shirtNumber',
  'shirtName',
  'favPosition',
  'avatarUrl',
);
export const matchAparitionSchema = S.Struct({
  id: S.optional(S.NullishOr(S.String)),
  minutes: S.optional(S.NullishOr(S.Number)),
  goals: S.optional(S.NullishOr(S.Number)),
  assists: S.optional(S.NullishOr(S.Number)),
  yellowCards: S.optional(S.NullishOr(S.Number)),
  redCards: S.optional(S.NullishOr(S.Number)),
  injury: S.optional(S.NullishOr(S.Boolean)),
  manOfTheMatch: S.optional(S.NullishOr(S.Boolean)),
  rating: S.optional(S.NullishOr(S.Number)),
  played: S.optional(S.NullishOr(S.Boolean)),
  confirmed: S.optional(S.NullishOr(S.Boolean)),
  playerId: S.optional(S.NullishOr(S.String)),
  matchId: S.optional(S.NullishOr(S.String)),
  match: S.optional(matchItem),
  player: S.optional(playerItem),
});

export type MatchAparitionType = S.Schema.Type<typeof matchAparitionSchema>;

export class FulfilledMatchAparition extends S.TaggedClass<FulfilledMatchAparition>()(
  'FulfilledMatchAparition',
  {
    ...matchAparitionSchema.fields,
  },
) {}

export class EmptyMatchAparition extends S.TaggedClass<EmptyMatchAparition>()(
  'EmptyMatchAparition',
  {
    ...matchAparitionSchema.omit('id', 'player', 'match').fields,
  },
) {}

export class FulfilledScorer extends S.TaggedClass<FulfilledScorer>()(
  'FulfilledScorer',
  {
    id: S.String,
    name: S.String,
    goals: S.Number,
    avatarUrl: S.String,
    shirtNumber: S.optional(S.Number),
  },
) {}
