import { SeasonRepository } from '../domain/season.repository';
import { EmptySeason } from '../domain/season.schema';

export class SeasonCreate {
  constructor(private repository: SeasonRepository) {}

  async run(emptySeason: EmptySeason) {
    return this.repository.create(emptySeason);
  }
}
