import { TypeOrmSeasonRepository } from '@/lib/Season/infrastructure/TypeOrm/TypeOrmSeasonRepository';
import { FulfilledTeamStats } from '../../domain/teamStats.schema';
import { TypeOrmCompetitionRepository } from '@/lib/Competition/infrastructure/TypeOrm/TypeOrmCompetitionRepository';
import { TypeOrmMatchRepository } from '@/lib/Match/infrastructure/TypeOrm/TypeOrmMatchRepository';
import { FulfilledMatch } from '@/lib/Match/domain/MatchSchema';
import { TypeOrmPlayerRepository } from '@/lib/Player/infrastructure/TypeOrm/TypeOrmPlayerRepository';
import { TypeOrmMatchAparitionRepository } from '@/lib/MatchAparition/infrastructure/TypeOrm/TypeOrmMatchAparitionRepository';
import { Logger } from '@nestjs/common';

export class DashboardGet {
  constructor(
    private readonly seasonRepository: TypeOrmSeasonRepository,
    private readonly competitionRepository: TypeOrmCompetitionRepository,
    private readonly matchRepository: TypeOrmMatchRepository,
    private readonly playerRepository: TypeOrmPlayerRepository,
    private readonly aparitionsRepository: TypeOrmMatchAparitionRepository,
  ) {}

  private readonly logger = new Logger(DashboardGet.name);

  async getTeamStats(teamId: string): Promise<FulfilledTeamStats> {
    const seasons = await this.seasonRepository.getAll(teamId);
    const competitions = await this.competitionRepository.getAllByTeam(teamId);
    const matches = await this.matchRepository.getAllByTeam(teamId);
    const matchesSummary = this.getMatchesSummary(matches, teamId);

    this.logger.log('TeamStats', '', matches.length);
    const machesWon = matchesSummary.filter((x) => x.isWon);
    const machesDrawn = matchesSummary.filter((x) => x.isDrawn);
    const machesLost = matchesSummary.filter((x) => x.isLost);

    return FulfilledTeamStats.make({
      competitionsCount: competitions.length,
      drawn: machesDrawn.length,
      lost: machesLost.length,
      matchesCount: matches.length,
      seasonsCount: seasons.length,
      won: machesWon.length,
    });
  }

  async getLastPlayersAdded(teamId: string, limit?: number) {
    const allPlayers = await this.playerRepository.getAllByTeam(teamId, limit);
    return allPlayers;
  }

  async getTopScorers(teamId: string) {
    const aparitions =
      await this.aparitionsRepository.getAllSortTopScorers(teamId);
    return aparitions;
  }
  async getTopAsists(teamId: string) {
    const aparitions =
      await this.aparitionsRepository.getAllSortTopAsists(teamId);
    return aparitions;
  }
  async getLastMatches(teamId: string, limit?: number) {
    const matches = await this.matchRepository.getLastMatchesByTeam(
      teamId,
      limit,
    );
    return matches;
  }

  async getNextMatches(teamId: string, limit?: number) {
    const matches = await this.matchRepository.getNextMatchesByTeam(
      teamId,
      limit,
    );
    return matches;
  }
  async getCalendar(teamId: string) {
    const allMatches = await this.matchRepository.getAllByTeamCalendar(teamId);
    return allMatches;
  }

  private getMatchesSummary(matches: FulfilledMatch[], teamId: string) {
    return matches.map((p) => {
      const isMyTeamHome = p.homeTeam?.id === teamId;

      const myTeamScore = isMyTeamHome ? p.homeScore : p.awayScore;
      const rivalScore = isMyTeamHome ? p.awayScore : p.homeScore;

      return {
        myTeamScore,
        rivalScore,
        isMyTeamHome,
        isWon: myTeamScore > rivalScore,
        isDrawn: myTeamScore === rivalScore,
        isLost: myTeamScore < rivalScore,
      };
    });
  }
}
