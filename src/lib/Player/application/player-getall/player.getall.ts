import { PlayerRepository } from '@/lib/player/domain/player.repository';
import {
  FulfilledPlayer,
  FulfilledPlayerWithStats,
} from '../../domain/player.schema';
import { MatchRepository } from '@/lib/match/domain/match.repository';

export class PlayerGetAll {
  constructor(
    private repository: PlayerRepository,
    private matchRepository: MatchRepository,
  ) {}

  async run(teamId: string): Promise<FulfilledPlayer[]> {
    return this.repository.getAll(teamId);
  }

  async searchByName(teamId: string, name: string): Promise<FulfilledPlayer[]> {
    return this.repository.searchByName(teamId, name);
  }

  async find(pid: string) {
    const fulfiledPlayer = await this.repository.getOneById(pid);
    const totalTeamMatches = await this.getTotalTeamMatches(
      fulfiledPlayer.team.id,
    );
    return this.mapPlayerStats(fulfiledPlayer, totalTeamMatches);
  }

  async getAllWithStats(teamId: string) {
    const players = await this.repository.getAllByTeamWithFilters(
      teamId,
      undefined,
      true,
    );
    const totalTeamMatches = await this.getTotalTeamMatches(teamId);

    const playersWithStats = players.map((p) =>
      this.mapPlayerStats(p, totalTeamMatches),
    );

    return playersWithStats;
  }

  mapPlayerStats(p: FulfilledPlayer, totalTeamMatches: number) {
    const assistsCount = (p.matchAparitions ?? []).reduce(
      (prev, acc) => prev + acc.assists,
      0,
    );

    const goalsCount = (p.matchAparitions ?? []).reduce(
      (prev, acc) => prev + acc.goals,
      0,
    );

    const minutesPlayed = (p.matchAparitions ?? []).reduce(
      (prev, acc) => prev + acc.minutes,
      0,
    );

    const playedMatches = (p.matchAparitions ?? []).reduce(
      (prev, acc) => prev + (acc.played ? 1 : 0),
      0,
    );

    return FulfilledPlayerWithStats.make({
      ...p,
      assists: assistsCount,
      goalsCount,
      minutesPlayed,
      playedMatches,
      totalTeamMatches,
      assistsAvg: assistsCount / playedMatches,
      goalsAvg: goalsCount / playedMatches,
      minutesPerc: (minutesPlayed / (totalTeamMatches * 60)) * 100,
      playedMatchesPerc: (playedMatches / totalTeamMatches) * 100,
    });
  }

  async getTotalTeamMatches(teamId: string) {
    const teamMatches = await this.matchRepository.getAllByTeam(teamId);
    return teamMatches.length;
  }
}
