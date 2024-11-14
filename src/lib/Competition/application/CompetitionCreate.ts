import { CompetitionRepository } from '../domain/CompetitionRepository';
import { EmptyCompetition } from '../domain/CompetitionSchema';

export class CompetitionCreate {
  constructor(private readonly repository: CompetitionRepository) {}

  run(emptyCompetition: EmptyCompetition) {
    return this.repository.create(emptyCompetition);
  }
}
