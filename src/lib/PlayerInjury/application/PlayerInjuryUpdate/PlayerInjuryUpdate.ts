import { PartialPlayerInjury } from '../../domain/playerInjury.schema';
import { PlayerInjuryRepository } from '../../domain/PlayerInjuryRepository';

export class PlayerInjuryUpdate {
  constructor(private readonly repository: PlayerInjuryRepository) {}

  async run(playerInjuryId: string, partialPlayerInjury: PartialPlayerInjury) {
    return this.repository.update(playerInjuryId, partialPlayerInjury);
  }
}
