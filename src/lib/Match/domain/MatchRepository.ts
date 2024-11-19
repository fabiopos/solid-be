import { MatchResultEnum } from '@/shared/enums/matchEnum';
import { EmptyMatch, FulfilledMatch } from './MatchSchema';

export interface MatchRepository {
  findById(matchId: string): Promise<FulfilledMatch>;
  getAllBySeason(seasonId: string): Promise<FulfilledMatch[]>;
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
