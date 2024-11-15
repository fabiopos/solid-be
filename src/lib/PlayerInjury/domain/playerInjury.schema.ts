import { playerSchema } from '@/lib/Player/domain/PlayerSchema';
import * as S from '@effect/schema/Schema';

const playerItem = playerSchema.pick(
  'firstName',
  'lastName',
  'id',
  'active',
  'shirtName',
  'shirtNumber',
);
export const playerInjurySchema = S.Struct({
  id: S.optional(S.NullishOr(S.String)),
  createdAt: S.optional(S.NullishOr(S.Date)),
  playerId: S.optional(S.NullishOr(S.String)),
  player: S.optional(playerItem),
  startedAt: S.optional(S.NullishOr(S.Date)),
  endsAt: S.optional(S.NullishOr(S.Date)),
  lowerBody: S.optional(S.NullishOr(S.Boolean)),
  upperBody: S.optional(S.NullishOr(S.Boolean)),
  diagnostic: S.optional(S.NullishOr(S.String)),
  leftFoot: S.optional(S.NullishOr(S.Boolean)),
  rightFoot: S.optional(S.NullishOr(S.Boolean)),
  active: S.optional(S.NullishOr(S.Boolean)),
});

export type PlayerInjuryType = S.Schema.Type<typeof playerInjurySchema>;

export class FulfilledPlayerInjury extends S.TaggedClass<FulfilledPlayerInjury>()(
  'FulfilledPlayerInjury',
  {
    ...playerInjurySchema.fields,
  },
) {}

export class EmptyPlayerInjury extends S.TaggedClass<EmptyPlayerInjury>()(
  'EmptyPlayerInjury',
  {
    ...playerInjurySchema.omit('id', 'createdAt', 'player').fields,
  },
) {}

export class PartialPlayerInjury extends S.TaggedClass<PartialPlayerInjury>()(
  'PartialPlayerInjury',
  {
    ...playerInjurySchema.omit('id', 'createdAt', 'player', 'playerId').fields,
  },
) {}
