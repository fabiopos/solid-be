import { PartialPlayerInjury } from '../../domain/player-injury.schema';
import { PlayerInjuryRepository } from '../../domain/player-injury.repository';

export class PlayerInjuryUpdate {
  constructor(private readonly repository: PlayerInjuryRepository) {}

  async run(playerInjuryId: string, partialPlayerInjury: PartialPlayerInjury) {
    return this.repository.update(playerInjuryId, partialPlayerInjury);
  }
}
