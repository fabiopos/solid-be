import { MatchAparitionRepository } from '../../domain/MatchAparitionRepository';

export class MatchAparitionGet {
  constructor(private readonly repository: MatchAparitionRepository) {}

  async getAllByMatchId(matchId: string) {
    return this.repository.getByMatchId(matchId);
  }

  async getAll() {
    return this.repository.getAll();
  }
}
