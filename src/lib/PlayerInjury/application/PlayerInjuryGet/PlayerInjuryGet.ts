import { PlayerInjuryRepository } from '../../domain/PlayerInjuryRepository';

export class PlayerInjuryGet {
  constructor(private readonly repository: PlayerInjuryRepository) {}

  async getAll() {
    return this.repository.getAll();
  }

  async getByPlayerId(playerId: string) {
    return this.repository.getAllByPlayerId(playerId);
  }
}
