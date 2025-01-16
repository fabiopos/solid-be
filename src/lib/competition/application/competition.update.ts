import { CompetitionRepository } from '../domain/competition.repository';
import { EmptyCompetition } from '../domain/competition.schema';

export class CompetitionUpdate {
  constructor(private readonly repository: CompetitionRepository) {}

  run(competitionId: string, emptyCompetition: EmptyCompetition) {
    return this.repository.update(competitionId, emptyCompetition);
  }
}
