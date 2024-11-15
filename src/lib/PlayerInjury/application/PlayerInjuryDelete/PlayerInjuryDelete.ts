import { PlayerInjuryRepository } from '../../domain/PlayerInjuryRepository';

export class PlayerInjuryDelete {
  constructor(private readonly repository: PlayerInjuryRepository) {}

  async run(playerInjuryId: string) {
    return this.repository.delete(playerInjuryId);
  }
}
