import { MatchAparitionRepository } from '../../domain/match-aparition.repository';

export class MatchAparitionDelete {
  constructor(private readonly repository: MatchAparitionRepository) {}

  async run(matchAparitionId: string) {
    return this.repository.delete(matchAparitionId);
  }
}
