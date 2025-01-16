import { PlayerInjuryRepository } from '../../domain/player-injury.repository';

export class PlayerInjuryDelete {
  constructor(private readonly repository: PlayerInjuryRepository) {}

  async run(playerInjuryId: string) {
    return this.repository.delete(playerInjuryId);
  }
}
