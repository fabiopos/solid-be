import { EmptyMatchAparition } from '../../domain/matchAparition.schema';
import { MatchAparitionRepository } from '../../domain/MatchAparitionRepository';

export class MatchAparitionUpdate {
  constructor(private readonly repository: MatchAparitionRepository) {}

  async run(
    matchAparitionId: string,
    emptyMatchAparition: EmptyMatchAparition,
  ) {
    return this.repository.update(matchAparitionId, emptyMatchAparition);
  }
}
