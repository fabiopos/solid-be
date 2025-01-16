import {
  EmptyPlayerPosition,
  FulfilledPlayerPosition,
} from './player-position.schema';

export interface PlayerPositionRepository {
  create(item: EmptyPlayerPosition): Promise<FulfilledPlayerPosition>;
  createAll(item: EmptyPlayerPosition[]): Promise<FulfilledPlayerPosition[]>;
  update(
    id: string,
    item: EmptyPlayerPosition,
  ): Promise<FulfilledPlayerPosition>;

  delete(playerId: string): Promise<void>;
  getAllPositionsByPlayer(playerId: string): Promise<FulfilledPlayerPosition[]>;
  updatePlayerPositions(
    playerId: string,
    positions: string[],
  ): Promise<FulfilledPlayerPosition[]>;
}
