import { EmptyMatch, FulfilledMatch } from './match.schema';
import { MatchResultEnum } from '../../../shared/enums/match.enum';

export interface MatchRepository {
  findById(matchId: string): Promise<FulfilledMatch>;
  getAllBySeason(seasonId: string): Promise<FulfilledMatch[]>;
  getAllByTeam(teamId: string): Promise<FulfilledMatch[]>;
  getAllByTeamCalendar(teamId: string): Promise<FulfilledMatch[]>;
  getLastMatchesByTeam(
    teamId: string,
    limit?: number,
  ): Promise<FulfilledMatch[]>;
  getNextMatchesByTeam(
    teamId: string,
    limit?: number,
  ): Promise<FulfilledMatch[]>;
  getAllByCompetitionId(competitionId: string): Promise<FulfilledMatch[]>;
  getGamesByResultCompetition(
    competitionId: string,
    result: MatchResultEnum,
    teamId: string,
  ): Promise<FulfilledMatch[]>;
  createMatch(emptyMatch: EmptyMatch): Promise<FulfilledMatch>;
  updateMatch(matchId: string, emptyMatch: EmptyMatch): Promise<FulfilledMatch>;
  deleteMatch(matchId: string): Promise<void>;
}
