import { MatchResultEnum } from '@/shared/enums/match.enum';
import { MatchRepository } from '../domain/match.repository';

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

  getBySeason(seasonId: string) {
    return this.repository.getAllBySeason(seasonId);
  }

  getAllByTeam(teamId: string) {
    return this.repository.getAllByTeam(teamId);
  }
}
