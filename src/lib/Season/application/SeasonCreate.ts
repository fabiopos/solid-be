import { SeasonRepository } from '../domain/SeasonRepository';
import { EmptySeason } from '../domain/SeasonSchema';

export class SeasonCreate {
  constructor(private repository: SeasonRepository) {}

  async run(emptySeason: EmptySeason) {
    return this.repository.create(emptySeason);
  }
}
