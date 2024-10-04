import * as S from '@effect/schema/Schema';
// import { teamSchema } from '@/lib/Team/domain/TeamSchema';
import {
  DocumentType,
  DominantFoot,
  PlayerStatus,
  ShirtSize,
} from '@/shared/enums/playerEnums';
import { fieldPositionSchema } from '@/lib/FieldPosition/domain/FieldPositionSchema';
import { FieldPositionCategoryEnum } from '@/shared/enums/fieldPositionCategoryEnum';

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const playerSchema = S.Struct({
  id: S.optional(S.String),
  teamId: S.optional(S.String),
  firstName: S.optional(S.String),
  lastName: S.optional(S.String),
  documentNumber: S.optional(S.String),
  documentType: S.Enums(DocumentType),
  active: S.optional(S.Boolean),
  status: S.optional(S.Enums(PlayerStatus)),
  email: S.optional(
    S.String.pipe(
      S.pattern(emailRegex, { message: () => 'Player email is invalid' }),
    ),
  ),
  shirtSize: S.optional(S.Enums(ShirtSize)),
  shirtName: S.optional(S.String),
  shirtNumber: S.optional(
    S.Number.pipe(
      S.between(1, 99, { message: () => `Shirt number should be between` }),
    ),
  ),
  dominantFoot: S.optional(S.Enums(DominantFoot)),
  // team: S.optional(teamSchema),
  favPositionId: S.optional(S.String),
  address: S.optional(S.NullishOr(S.String)),
  avatarUrl: S.optional(S.NullishOr(S.String)),
  phone: S.optional(S.NullishOr(S.String)),
  city: S.optional(S.NullishOr(S.String)),
  country: S.optional(S.NullishOr(S.String)),
  eps: S.optional(S.NullishOr(S.String)),
  arl: S.optional(S.NullishOr(S.String)),
  weight: S.optional(
    S.NullishOr(
      S.Number.pipe(
        S.between(35, 200, {
          message: () => `Not supported weight to create a player`,
        }),
      ),
    ),
  ),
  height: S.optional(
    S.NullishOr(
      S.Number.pipe(
        S.between(140, 210, {
          message: () => `Not supported height to create a player`,
        }),
      ),
    ),
  ),
  playerPositions: S.optional(
    S.Array(
      S.Struct({
        id: S.optional(S.String),
        category: S.optional(S.Enums(FieldPositionCategoryEnum)),
        fieldPosition: S.optional(fieldPositionSchema),
      }),
    ),
  ),
  team: S.optional(
    S.Struct({
      id: S.optional(S.String),
      name: S.optional(S.String),
    }),
  ),
});

export type SourcePlayerType = S.Schema.Type<typeof playerSchema>;

export const updatePlayerSchema = playerSchema.pick(
  'active',
  'address',
  'arl',
  'avatarUrl',
  'city',
  'country',
  'dominantFoot',
  'eps',
  'favPositionId',
  'firstName',
  'height',
  'lastName',
  'phone',
  'shirtNumber',
  'shirtSize',
  'weight',
  'status',
);

export type UpdatePlayerType = S.Schema.Type<typeof updatePlayerSchema>;

export class EmptyPlayer extends S.TaggedClass<EmptyPlayer>()('EmptyPlayer', {
  teamId: playerSchema.fields.teamId,
  firstName: playerSchema.fields.firstName,
  lastName: playerSchema.fields.lastName,
  documentNumber: playerSchema.fields.documentNumber,
  documentType: playerSchema.fields.documentType,
  email: playerSchema.fields.email,
  shirtSize: playerSchema.fields.shirtSize,
  shirtNumber: playerSchema.fields.shirtNumber,
  shirtName: playerSchema.fields.shirtName,
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
  playerPositions: playerSchema.fields.playerPositions,
  fieldPositions: S.optional(S.Array(S.String)),
  team: S.optional(S.Struct({ id: S.optional(S.String) })),
}) {}

export class FulfilledPlayer extends S.TaggedClass<FulfilledPlayer>()(
  'FulfilledPlayer',
  {
    ...playerSchema.fields,
  },
) {}
