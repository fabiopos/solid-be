import { Team } from '../../domain/Team';
import { TeamRepository } from '../../domain/TeamRepository';

export class TeamGetAll {
  constructor(private repository: TeamRepository) {}

  async run(): Promise<Team[]> {
    return this.repository.getAll();
  }
}
