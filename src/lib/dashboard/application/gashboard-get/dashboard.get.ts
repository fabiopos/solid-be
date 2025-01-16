import { TypeOrmSeasonRepository } from '@/lib/season/infrastructure/type-orm/type-orm-season.repository';
import { FulfilledTeamStats } from '../../domain/team-stats.schema';
import { TypeOrmCompetitionRepository } from '@/lib/competition/infrastructure/type-orm/type-orm-competition.repository';
import { TypeOrmMatchRepository } from '@/lib/match/infrastructure/type-orm/type-orm-match.repository';
import { FulfilledMatch } from '@/lib/match/domain/match.schema';
import { TypeOrmPlayerRepository } from '@/lib/player/infrastructure/type-orm/type-orm-player.repository';
import { TypeOrmMatchAparitionRepository } from '@/lib/match-aparition/infrastructure/type-orm/type-orm-match-aparition.repository';
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
    const rawScorers =
      await this.aparitionsRepository.getAllSortTopScorers(teamId);

    const allPlayers = await this.playerRepository.getAllByTeam(teamId);
    const mappedScorers = rawScorers.map((r) => {
      const player = allPlayers.find((p) => p.id === r.id);
      return {
        id: r.id,
        name: `${player?.firstName} ${player?.lastName}`,
        shirtName: player.shirtName,
        goals: r.goals,
        avatarUrl: player?.avatarUrl,
        shirtNumber: player?.shirtNumber,
      };
    });

    return mappedScorers;
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
