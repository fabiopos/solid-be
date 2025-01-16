import { TeamRepository } from '../../domain/TeamRepository';

export class TeamDelete {
  constructor(private readonly repository: TeamRepository) {}

  run(teamId: string) {
    return this.repository.delete(teamId);
  }
}
