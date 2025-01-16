import { PlayerInjuryRepository } from '../../domain/player-injury.repository';

export class PlayerInjuryGet {
  constructor(private readonly repository: PlayerInjuryRepository) {}

  async getAll() {
    return this.repository.getAll();
  }

  async getByPlayerId(playerId: string) {
    return this.repository.getAllByPlayerId(playerId);
  }
}
