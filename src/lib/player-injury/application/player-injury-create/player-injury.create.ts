import { EmptyPlayerInjury } from '../../domain/player-injury.schema';
import { PlayerInjuryRepository } from '../../domain/player-injury.repository';

export class PlayerInjuryCreate {
  constructor(private readonly repository: PlayerInjuryRepository) {}

  async run(emptyPlayerInjury: EmptyPlayerInjury) {
    return this.repository.create(emptyPlayerInjury);
  }
}
