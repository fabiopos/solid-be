import { MatchAparitionRepository } from '../../domain/match-aparition.repository';

export class MatchAparitionGet {
  constructor(private readonly repository: MatchAparitionRepository) {}

  async getAllByMatchId(matchId: string) {
    return this.repository.getByMatchId(matchId);
  }

  async getAll() {
    return this.repository.getAll();
  }
}
