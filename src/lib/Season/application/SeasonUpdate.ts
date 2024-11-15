import { SeasonRepository } from '../domain/SeasonRepository';
import { PartialSeason } from '../domain/SeasonSchema';

export class SeasonUpdate {
  constructor(private repository: SeasonRepository) {}

  async run(seasonId: string, partialSeason: PartialSeason) {
    return this.repository.update(seasonId, partialSeason);
  }
}
