import { CompetitionRepository } from '../domain/CompetitionRepository';

export class CompetitionGet {
  constructor(private readonly repository: CompetitionRepository) {}
  getAllBySeason(seasonId: string) {
    return this.repository.getAllBySeason(seasonId);
  }

  getAllByTeam(teamId: string) {
    return this.repository.getAllByTeam(teamId);
  }

  findById(competitionId: string) {
    return this.repository.findById(competitionId);
  }
}
