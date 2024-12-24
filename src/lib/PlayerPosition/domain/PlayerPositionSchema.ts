import { fieldPositionSchema } from '@/lib/FieldPosition/domain/FieldPositionSchema';
import { playerSchema } from '@/lib/Player/domain/PlayerSchema';
import { Schema as S } from '@effect/schema';

export const playerPositionSchema = S.Struct({
  id: S.optional(S.String),
  createdAt: S.optional(S.Date),
  player: S.optional(
    playerSchema.pick(
      'id',
      'firstName',
      'lastName',
      'active',
      'shirtNumber',
      'shirtName',
    ),
  ),
  fieldPosition: S.optional(fieldPositionSchema.omit('createdAt', 'category')),
});

export type PlayerPositionType = S.Schema.Type<typeof playerPositionSchema>;

export class EmptyPlayerPosition extends S.TaggedClass<EmptyPlayerPosition>()(
  'EmptyPlayerPosition',
  {
    player: playerPositionSchema.fields.player,
    fieldPosition: playerPositionSchema.fields.fieldPosition,
  },
) {}

export class FulfilledPlayerPosition extends S.TaggedClass<FulfilledPlayerPosition>()(
  'FulfilledPlayerPosition',
  {
    player: playerPositionSchema.fields.player,
    fieldPosition: playerPositionSchema.fields.fieldPosition,
  },
) {}
