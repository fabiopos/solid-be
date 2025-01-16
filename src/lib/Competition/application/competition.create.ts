import { CompetitionRepository } from '../domain/competition.repository';
import { EmptyCompetition } from '../domain/competition.schema';

export class CompetitionCreate {
  constructor(private readonly repository: CompetitionRepository) {}

  run(emptyCompetition: EmptyCompetition) {
    return this.repository.create(emptyCompetition);
  }
}
