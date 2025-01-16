import { MatchRepository } from '../domain/match.repository';
import { EmptyMatch } from '../domain/match.schema';

export class MatchUpdate {
  constructor(private readonly repository: MatchRepository) {}

  run(matchId: string, emptyMatch: EmptyMatch) {
    return this.repository.updateMatch(matchId, emptyMatch);
  }
}
