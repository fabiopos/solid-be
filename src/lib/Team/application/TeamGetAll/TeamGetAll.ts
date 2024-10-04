import { TeamRepository } from '../../domain/TeamRepository';
import { FulfilledTeam } from '../../domain/TeamSchema';

export class TeamGetAll {
  constructor(private repository: TeamRepository) {}

  async run(): Promise<FulfilledTeam[]> {
    const teams = await this.repository.getAll();
    return teams;
  }
}
