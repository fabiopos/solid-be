import {
  EmptyPlayerPosition,
  FulfilledPlayerPosition,
} from './PlayerPositionSchema';

export interface PlayerPositionRepository {
  create(item: EmptyPlayerPosition): Promise<FulfilledPlayerPosition>;
  createAll(item: EmptyPlayerPosition[]): Promise<FulfilledPlayerPosition[]>;
  update(
    id: string,
    item: EmptyPlayerPosition,
  ): Promise<FulfilledPlayerPosition>;

  delete(id: string): Promise<void>;
  getAllPositionsByPlayer(playerId: string): Promise<FulfilledPlayerPosition[]>;
}
