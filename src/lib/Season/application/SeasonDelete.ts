import { SeasonRepository } from '../domain/SeasonRepository';

export class SeasonDelete {
  constructor(private readonly repository: SeasonRepository) {}

  async run(seasonId: string) {
    return this.repository.deleteSeason(seasonId);
  }
}
