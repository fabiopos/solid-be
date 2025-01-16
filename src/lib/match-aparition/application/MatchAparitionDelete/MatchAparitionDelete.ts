import { MatchAparitionRepository } from '../../domain/MatchAparitionRepository';

export class MatchAparitionDelete {
  constructor(private readonly repository: MatchAparitionRepository) {}

  async run(matchAparitionId: string) {
    return this.repository.delete(matchAparitionId);
  }
}
