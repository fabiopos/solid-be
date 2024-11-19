import { SeasonRepository } from '../domain/SeasonRepository';

export class SeasonGet {
  constructor(private repository: SeasonRepository) {}

  async run(teamId: string) {
    return this.repository.getAll(teamId);
  }

  async bySubscription(subscriptionId: string) {
    return this.repository.getAllBySubscription(subscriptionId);
  }

  async findSeason(seasonId: string) {
    return this.repository.find(seasonId);
  }
}
