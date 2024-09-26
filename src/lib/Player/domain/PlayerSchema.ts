import * as S from '@effect/schema/Schema';
// import { teamSchema } from '@/lib/Team/domain/TeamSchema';
import {
  DocumentType,
  DominantFoot,
  ShirtSize,
} from '@/shared/enums/playerEnums';

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const playerSchema = S.Struct({
  id: S.String,
  teamId: S.String,
  firstName: S.String,
  lastName: S.String,
  documentNumber: S.String,
  documentType: S.Enums(DocumentType),
  active: S.Boolean,
  email: S.String.pipe(
    S.pattern(emailRegex, { message: () => 'Player email is invalid' }),
  ),
  shirtSize: S.Enums(ShirtSize),
  shirtNumber: S.Number.pipe(
    S.between(1, 99, { message: () => `Shirt number should be between` }),
  ),
  dominantFoot: S.Enums(DominantFoot),
  // team: S.optional(teamSchema),
  favPositionId: S.optional(S.String),
  address: S.optional(S.String),
  avatarUrl: S.optional(S.String),
  phone: S.optional(S.String),
  city: S.optional(S.String),
  country: S.optional(S.String),
  eps: S.optional(S.String),
  arl: S.optional(S.String),
  weight: S.optional(
    S.Number.pipe(
      S.between(35, 200, {
        message: () => `Not supported weight to create a player`,
      }),
    ),
  ),
  height: S.optional(
    S.Number.pipe(
      S.between(140, 210, {
        message: () => `Not supported height to create a player`,
      }),
    ),
  ),
});

export type SourcePlayerType = S.Schema.Type<typeof playerSchema>;

export class EmptyPlayer extends S.TaggedClass<EmptyPlayer>()('EmptyPlayer', {
  teamId: playerSchema.fields.teamId,
  firstName: playerSchema.fields.firstName,
  lastName: playerSchema.fields.lastName,
  documentNumber: playerSchema.fields.documentNumber,
  documentType: playerSchema.fields.documentType,
  email: playerSchema.fields.email,
  shirtSize: playerSchema.fields.shirtSize,
  shirtNumber: playerSchema.fields.shirtNumber,
  dominantFoot: playerSchema.fields.dominantFoot,
  favPositionId: playerSchema.fields.favPositionId,
  address: playerSchema.fields.address,
  avatarUrl: playerSchema.fields.avatarUrl,
  phone: playerSchema.fields.phone,
  city: playerSchema.fields.city,
  country: playerSchema.fields.country,
  eps: playerSchema.fields.eps,
  arl: playerSchema.fields.eps,
  weight: playerSchema.fields.weight,
  height: playerSchema.fields.height,
}) {}

export class FulfilledPlayer extends S.TaggedClass<FulfilledPlayer>()(
  'FulfilledPlayer',
  {
    ...playerSchema.fields,
  },
) {}
