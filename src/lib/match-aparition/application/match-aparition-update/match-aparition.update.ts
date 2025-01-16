import { EmptyMatchAparition } from '../../domain/match-aparition.schema';
import { MatchAparitionRepository } from '../../domain/match-aparition.repository';

export class MatchAparitionUpdate {
  constructor(private readonly repository: MatchAparitionRepository) {}

  async run(
    matchAparitionId: string,
    emptyMatchAparition: EmptyMatchAparition,
  ) {
    return this.repository.update(matchAparitionId, emptyMatchAparition);
  }
}
