import { PlayerPositionRepository } from '../domain/PlayerPositionRepository';
import { EmptyPlayerPosition } from '../domain/PlayerPositionSchema';

export class PlayerPositionCreate {
  constructor(private repository: PlayerPositionRepository) {}

  async run(payload: EmptyPlayerPosition) {
    return this.repository.create(payload);
  }

  async upsert(playerId: string, positions: string[]) {
    return this.repository.updatePlayerPositions(playerId, positions);
  }
}
