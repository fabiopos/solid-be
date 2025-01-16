import { TeamRepository } from '../../domain/TeamRepository';

export class TeamFind {
  constructor(private repository: TeamRepository) {}

  async run(id: string) {
    return this.repository.getOneById(id);
  }
}
