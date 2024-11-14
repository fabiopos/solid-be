import { CompetitionRepository } from '../domain/CompetitionRepository';
import { EmptyCompetition } from '../domain/CompetitionSchema';

export class CompetitionUpdate {
  constructor(private readonly repository: CompetitionRepository) {}

  run(competitionId: string, emptyCompetition: EmptyCompetition) {
    return this.repository.update(competitionId, emptyCompetition);
  }
}
