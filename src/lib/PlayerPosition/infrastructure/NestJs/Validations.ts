import { IsArray } from 'class-validator';

export class PlayerPositionUpsertPayload {
  @IsArray()
  positions: string[];
}
