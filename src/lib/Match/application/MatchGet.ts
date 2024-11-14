import { MatchResultEnum } from '@/shared/enums/matchEnum';
import { MatchRepository } from '../domain/MatchRepository';

export class MatchGet {
  constructor(private readonly repository: MatchRepository) {}

  getAllByCompetitionId(competitionId: string) {
    return this.repository.getAllByCompetitionId(competitionId);
  }

  findById(matchId: string) {
    return this.repository.findById(matchId);
  }

  getGamesByResultCompetition(
    competitionId: string,
    result: MatchResultEnum,
    teamId: string,
  ) {
    return this.repository.getGamesByResultCompetition(
      competitionId,
      result,
      teamId,
    );
  }
}
