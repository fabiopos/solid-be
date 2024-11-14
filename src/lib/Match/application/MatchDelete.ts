import { MatchRepository } from '../domain/MatchRepository';

export class MatchDelete {
  constructor(private readonly repository: MatchRepository) {}

  run(matchId: string) {
    return this.repository.deleteMatch(matchId);
  }
}
