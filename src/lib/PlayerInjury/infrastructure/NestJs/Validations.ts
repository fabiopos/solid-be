import { IsUUID } from 'class-validator';

export class PlayerInjuryGetByPlayerIdParams {
  @IsUUID()
  playerId: string;
}

export class PlayerInjuryUpdateParams {
  @IsUUID()
  playerInjuryId: string;
}

export class PlayerInjuryDeleteParams {
  @IsUUID()
  playerInjuryId: string;
}

export class PlayerInjuryCreatePayload {}

export class PlayerInjuryUpdatePayload {}
