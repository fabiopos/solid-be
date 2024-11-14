import { MatchRepository } from '../domain/MatchRepository';
import { EmptyMatch } from '../domain/MatchSchema';

export class MatchCreate {
  constructor(private readonly repository: MatchRepository) {}

  run(emptyMatch: EmptyMatch) {
    return this.repository.createMatch(emptyMatch);
  }
}
