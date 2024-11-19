import { SeasonRepository } from '../domain/SeasonRepository';
import { PartialSeason } from '../domain/SeasonSchema';

export class SeasonUpdate {
  constructor(private repository: SeasonRepository) {}

  async run(seasonId: string, partialSeason: PartialSeason) {
    await this.repository.update(seasonId, partialSeason);
    return this.repository.find(seasonId);
  }
}
