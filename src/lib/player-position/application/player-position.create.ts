import { PlayerPositionRepository } from '../domain/player-position.repository';
import { EmptyPlayerPosition } from '../domain/player-position.schema';

export class PlayerPositionCreate {
  constructor(private repository: PlayerPositionRepository) {}

  async run(payload: EmptyPlayerPosition) {
    return this.repository.create(payload);
  }

  async upsert(playerId: string, positions: string[]) {
    return this.repository.updatePlayerPositions(playerId, positions);
  }
}
