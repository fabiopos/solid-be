import { MatchRepository } from '../domain/match.repository';
import { EmptyMatch } from '../domain/match.schema';

export class MatchCreate {
  constructor(private readonly repository: MatchRepository) {}

  run(emptyMatch: EmptyMatch) {
    return this.repository.createMatch(emptyMatch);
  }
}
