import { Schema as S } from '@effect/schema';

export const authLoginSchema = S.Struct({
  email: S.String,
  password: S.String,
});

export interface Token {
  email: string;
  name: string;
  subscriptionId: string;
  tid: string;
}

export type AuthSchemaType = S.Schema.Type<typeof authLoginSchema>;
