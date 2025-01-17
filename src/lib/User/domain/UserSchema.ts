import * as S from '@effect/schema/Schema';

import { DocumentType } from '../../../shared/enums/player.enum';
import { RoleEnum } from '../../../shared/enums/role.enum';

export const userSchema = S.Struct({
  id: S.optional(S.String),
  firstName: S.optional(S.NullishOr(S.String)),
  lastName: S.optional(S.NullishOr(S.String)),
  documentNumber: S.optional(S.String),
  documentType: S.optional(S.Enums(DocumentType)),
  roleId: S.optional(S.Enums(RoleEnum)),
  policy: S.optional(S.Boolean),
  email: S.optional(S.String),
  password: S.optional(S.String),
  active: S.optional(S.Boolean),
  avatarUrl: S.optional(S.NullishOr(S.String)),
  phone: S.optional(S.NullishOr(S.String)),
  address: S.optional(S.NullishOr(S.String)),
  city: S.optional(S.NullishOr(S.String)),
  country: S.optional(S.NullishOr(S.String)),
  createdAt: S.optional(S.Union(S.Date, S.String)),
});

export type UserType = S.Schema.Type<typeof userSchema>;

export class UserUpdateInput extends S.TaggedClass<UserUpdateInput>()(
  'UserUpdateInput',
  {
    firstName: userSchema.fields.firstName,
    lastName: userSchema.fields.lastName,
    documentNumber: userSchema.fields.documentNumber,
    documentType: userSchema.fields.documentType,
    active: userSchema.fields.active,
    avatarUrl: userSchema.fields.avatarUrl,
    phone: userSchema.fields.phone,
    address: userSchema.fields.address,
    city: userSchema.fields.city,
    country: userSchema.fields.country,
  },
) {}

export class FulfilledUser extends S.TaggedClass<FulfilledUser>()(
  'FulfilledUser',
  {
    ...userSchema.omit('password').fields,
  },
) {}
