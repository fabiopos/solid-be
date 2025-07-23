import { Schema as S } from '@effect/schema';

export const numberTaken = S.Struct({
  shirtNumber: S.NullishOr(S.Number),
  shirtName: S.NullishOr(S.String),
  name: S.NullishOr(S.String),
  pid: S.String,
});

export const teamInvite = S.Struct({
  name: S.String,
  teamId: S.String,
  logoUrl: S.NullishOr(S.String),
});

export const inviteDataSchema = S.Struct({
  email: S.String,
  phone: S.String,
  numbersTaken: S.Array(numberTaken),
  team: teamInvite,
});

export type InviteDataSchemaType = S.Schema.Type<typeof inviteDataSchema>;
