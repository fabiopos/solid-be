import {
  EmptyPlayerInjury,
  FulfilledPlayerInjury,
  PartialPlayerInjury,
} from './player-injury.schema';

export interface PlayerInjuryRepository {
  getAll(): Promise<FulfilledPlayerInjury[]>;
  getAllByPlayerId(playerId: string): Promise<FulfilledPlayerInjury[]>;
  create(emptyPlayerInjury: EmptyPlayerInjury): Promise<FulfilledPlayerInjury>;
  update(
    playerInjuryId: string,
    emptyPlayerInjury: PartialPlayerInjury,
  ): Promise<FulfilledPlayerInjury>;
  delete(playerInjuryId: string): Promise<void>;
}
