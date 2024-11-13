import { SeasonRepository } from '../domain/SeasonRepository';

export class SeasonGet {
  constructor(private repository: SeasonRepository) {}

  async run(teamId: string) {
    return this.repository.getAll(teamId);
  }
}
