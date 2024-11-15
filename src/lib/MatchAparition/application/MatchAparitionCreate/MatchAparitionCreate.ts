import { EmptyMatchAparition } from '../../domain/matchAparition.schema';
import { MatchAparitionRepository } from '../../domain/MatchAparitionRepository';

export class MatchAparitionCreate {
  constructor(private readonly repository: MatchAparitionRepository) {}

  async run(emptyMatchAparition: EmptyMatchAparition) {
    return this.repository.create(emptyMatchAparition);
  }
}
