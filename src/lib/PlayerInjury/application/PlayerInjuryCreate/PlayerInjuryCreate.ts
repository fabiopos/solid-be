import { EmptyPlayerInjury } from '../../domain/playerInjury.schema';
import { PlayerInjuryRepository } from '../../domain/PlayerInjuryRepository';

export class PlayerInjuryCreate {
  constructor(private readonly repository: PlayerInjuryRepository) {}

  async run(emptyPlayerInjury: EmptyPlayerInjury) {
    return this.repository.create(emptyPlayerInjury);
  }
}
