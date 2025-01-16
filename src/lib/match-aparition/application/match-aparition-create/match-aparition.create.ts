import { EmptyMatchAparition } from '../../domain/match-aparition.schema';
import { MatchAparitionRepository } from '../../domain/match-aparition.repository';

export class MatchAparitionCreate {
  constructor(private readonly repository: MatchAparitionRepository) {}

  async run(emptyMatchAparition: EmptyMatchAparition) {
    return this.repository.create({
      ...emptyMatchAparition,
      assists: 0,
      injury: false,
      manOfTheMatch: false,
    });
  }
}
