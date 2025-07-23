import { Schema as S } from '@effect/schema';

export const twoFactorSchema = S.Struct({
  id: S.String,
  phone: S.String,
  status: S.String,
  teamId: S.String,
  email: S.String,
});

export const twoFactorUpdateSchema = S.Struct({
  id: S.String,
  status: S.String,
});

export type TwoFactorSchemaType = S.Schema.Type<typeof twoFactorSchema>;

export type TwoFactorUpdateSchemaType = S.Schema.Type<
  typeof twoFactorUpdateSchema
>;
