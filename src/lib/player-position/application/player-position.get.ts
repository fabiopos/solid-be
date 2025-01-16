import { PlayerPositionRepository } from '../domain/player-position.repository';

export class PlayerPositionGet {
  constructor(private readonly repository: PlayerPositionRepository) {}

  async run(playerId: string) {
    return this.repository.getAllPositionsByPlayer(playerId);
  }
}
