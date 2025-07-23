import { SeasonRepository } from '../domain/season.repository';
import { PartialSeason } from '../domain/season.schema';

export class SeasonUpdate {
  constructor(private repository: SeasonRepository) {}

  async run(seasonId: string, partialSeason: PartialSeason) {
    await this.repository.update(seasonId, partialSeason);
    return this.repository.find(seasonId);
  }
}
