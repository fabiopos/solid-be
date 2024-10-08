import { DocumentType } from '@/shared/enums/playerEnums';
import { RoleEnum } from '@/shared/enums/roleEnum';
import * as S from '@effect/schema/Schema';

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
  avatarUrl: S.optional(S.String),
  phone: S.optional(S.String),
  address: S.optional(S.String),
  city: S.optional(S.String),
  country: S.optional(S.String),
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
