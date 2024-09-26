import { playerSchema } from '@/lib/Player/domain/PlayerSchema';
import * as S from '@effect/schema/Schema';

export const teamSchema = S.Struct({
  id: S.String,
  name: S.String,
  active: S.Boolean,
  subscriptionId: S.String,
  hasSubscription: S.optional(S.Boolean),
  createdAt: S.optional(S.Date),
  players: S.optional(S.NullishOr(S.Array(playerSchema))),
  primaryColor: S.optional(S.NullishOr(S.String)),
  secondaryColor: S.optional(S.NullishOr(S.String)),
  logoUrl: S.optional(S.NullishOr(S.String)),
  shieldUrl: S.optional(S.NullishOr(S.String)),
});

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
) {}

export type TeamT = EmptyTeam | FulfilledTeam;

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
