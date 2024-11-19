import { PlayerPositionRepository } from '../domain/PlayerPositionRepository';

export class PlayerPositionGet {
  constructor(private readonly repository: PlayerPositionRepository) {}

  async run(playerId: string) {
    return this.repository.getAllPositionsByPlayer(playerId);
  }
}
