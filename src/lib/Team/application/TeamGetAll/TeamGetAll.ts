import { TeamRepository } from '../../domain/TeamRepository';
import { FulfilledTeam } from '../../domain/TeamSchema';

export class TeamGetAll {
  constructor(private repository: TeamRepository) {}

  async run(subscriptionId: string): Promise<FulfilledTeam[]> {
    const teams = await this.repository.getAll(subscriptionId);
    return teams;
  }

  async searchByName(name: string): Promise<FulfilledTeam[]> {
    const teams = await this.repository.searchByName(name);
    return teams;
  }
}
