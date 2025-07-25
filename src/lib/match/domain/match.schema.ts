import * as S from '@effect/schema/Schema';

import { playerSchema } from '../../../lib/player/domain/player.schema';
import { CompetitionStatusEnum } from '../../../shared/enums/competition-status.enum';

const matchTeam = S.Struct({
  id: S.optional(S.NullishOr(S.String)),
  name: S.optional(S.NullishOr(S.String)),
  players: S.optional(S.Array(playerSchema)),
});

const matchCompetition = S.Struct({
  id: S.NullishOr(S.String),
  name: S.NullishOr(S.String),
  status: S.NullishOr(S.Enums(CompetitionStatusEnum)),
});

const playerItem = playerSchema.pick(
  'id',
  'firstName',
  'lastName',
  'shirtNumber',
  'shirtName',
  'favPosition',
  'avatarUrl',
);

const matchAparition = S.Struct({
  id: S.String,
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
  player: S.optional(playerItem),
});

export const matchSchema = S.Struct({
  id: S.optional(S.String),
  homeTeamId: S.optional(S.String),
  awayTeamId: S.optional(S.String),
  competitionId: S.optional(S.String),
  createdAt: S.optional(S.Date),
  title: S.optional(S.String),
  homeTeam: S.optional(S.NullishOr(matchTeam)),
  awayTeam: S.optional(S.NullishOr(matchTeam)),
  awayScore: S.optional(S.NullishOr(S.Number)),
  homeScore: S.optional(S.NullishOr(S.Number)),
  matchDay: S.optional(S.NullishOr(S.Date)),
  matchHour: S.optional(S.NullishOr(S.Date)),
  wo: S.optional(S.Boolean),
  location: S.optional(S.NullishOr(S.String)),
  completed: S.optional(S.Boolean),
  competition: S.optional(matchCompetition),
  matchAparitions: S.optional(S.Array(matchAparition)),
});

export type MatchType = S.Schema.Type<typeof matchSchema>;

export class EmptyMatch extends S.TaggedClass<EmptyMatch>()('EmptyMatch', {
  title: matchSchema.fields.title,
  homeTeamId: matchSchema.fields.homeTeamId,
  awayTeamId: matchSchema.fields.awayTeamId,
  competitionId: matchSchema.fields.competitionId,
  matchDay: matchSchema.fields.matchDay,
  matchHour: matchSchema.fields.matchHour,
  wo: matchSchema.fields.wo,
  location: matchSchema.fields.location,
  completed: matchSchema.fields.completed,
  homeScore: matchSchema.fields.homeScore,
  awayScore: matchSchema.fields.awayScore,
}) {}

export class FulfilledMatch extends S.TaggedClass<FulfilledMatch>()(
  'FulfilledMatch',
  {
    ...matchSchema.fields,
  },
) {}
