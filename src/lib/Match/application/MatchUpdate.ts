import { MatchRepository } from '../domain/MatchRepository';
import { EmptyMatch } from '../domain/MatchSchema';

export class MatchUpdate {
  constructor(private readonly repository: MatchRepository) {}

  run(matchId: string, emptyMatch: EmptyMatch) {
    return this.repository.updateMatch(matchId, emptyMatch);
  }
}
