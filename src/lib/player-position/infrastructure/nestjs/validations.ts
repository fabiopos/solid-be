import { IsArray, IsString } from 'class-validator';

export class PlayerPositionUpsertPayload {
  @IsArray()
  positions: string[];
}

export class LineupDto {
  @IsString()
  teamId: string;

  @IsArray()
  positions: {
    positionId: string;
    playerId: string;
  }[];
}
