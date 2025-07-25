import { playerSchema } from '../../../lib/player/domain/player.schema';
import * as S from '@effect/schema/Schema';

export const teamSchema = S.Struct({
  id: S.optional(S.String),
  name: S.optional(S.String),
  active: S.optional(S.Boolean),
  subscriptionId: S.optional(S.String),
  hasSubscription: S.optional(S.Boolean),
  createdAt: S.optional(S.Date),
  players: S.optional(S.NullishOr(S.Array(playerSchema))),
  primaryColor: S.optional(S.NullishOr(S.String)),
  secondaryColor: S.optional(S.NullishOr(S.String)),
  logoUrl: S.optional(S.NullishOr(S.String)),
  shieldUrl: S.optional(S.NullishOr(S.String)),
});

export const teamCreateSchema = teamSchema.pick(
  'active',
  'hasSubscription',
  'logoUrl',
  'name',
  'primaryColor',
  'secondaryColor',
  'shieldUrl',
  'subscriptionId',
);

export type TeamType = S.Schema.Type<typeof teamSchema>;

export class EmptyTeam extends S.TaggedClass<EmptyTeam>()('EmptyTeam', {
  name: teamSchema.fields.name,
  subscriptionId: teamSchema.fields.subscriptionId,
}) {
  get active(): boolean {
    return true;
  }
  get hasSubscription(): boolean {
    return this.subscriptionId !== null;
  }
}

export class FulfilledTeam extends S.TaggedClass<FulfilledTeam>()(
  'FulfilledTeam',
  {
    ...teamSchema.fields,
  },
) {
  get playersCount(): number {
    return (this.players ?? []).length;
  }
}

export type TeamT = EmptyTeam | FulfilledTeam;

export class TeamResponse extends S.TaggedClass<TeamResponse>()('TeamReponse', {
  ...teamSchema.fields,
  playersCount: S.optional(S.Number),
}) {}

//   id: string;
//   name: string;
//   active: boolean;
//   primaryColor?: string | null;
//   secondaryColor?: string | null;
//   logoUrl?: string | null;
//   shieldUrl?: string | null;
//   createdAt: Date;
//   hasSubscription: boolean;
//   subscriptionId: string;
