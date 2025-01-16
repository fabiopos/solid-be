import { CompetitionRepository } from '../domain/competition.repository';

export class CompetitionDelete {
  constructor(private readonly repository: CompetitionRepository) {}

  run(competitionId: string) {
    return this.repository.delete(competitionId);
  }
}
