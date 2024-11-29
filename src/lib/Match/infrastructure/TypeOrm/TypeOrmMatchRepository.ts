import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmMatchEntity } from './TypeOrmMatchEntity';
import { Repository } from 'typeorm';
import { TypeOrmTeamEntity } from '@/lib/Team/infrastructure/TypeOrm/TypeOrmTeamEntity';
import { MatchRepository } from '../../domain/MatchRepository';
import { MatchResultEnum } from '@/shared/enums/matchEnum';
import { EmptyMatch, FulfilledMatch } from '../../domain/MatchSchema';

export class TypeOrmMatchRepository implements MatchRepository {
  constructor(
    @InjectRepository(TypeOrmMatchEntity)
    private readonly repository: Repository<TypeOrmMatchEntity>,

    @InjectRepository(TypeOrmTeamEntity)
    private readonly teamRepository: Repository<TypeOrmTeamEntity>,
  ) {}
  async getAllBySeason(seasonId: string): Promise<FulfilledMatch[]> {
    const matches = await this.repository.find({
      where: { competition: { season: { id: seasonId } } },
      relations: { awayTeam: true, homeTeam: true, competition: true },
    });

    return matches.map(this.mapEntityToDomain);
  }

  async findById(matchId: string): Promise<FulfilledMatch> {
    const match = await this.repository.findOne({
      where: { id: matchId },
      relations: {
        homeTeam: true,
        awayTeam: true,
        competition: true,
      },
    });
    return this.mapEntityToDomain(match);
  }

  async getAllByCompetitionId(
    competitionId: string,
  ): Promise<FulfilledMatch[]> {
    const matches = await this.repository.find({
      where: { competition: { id: competitionId } },
    });

    return matches.map(this.mapEntityToDomain);
  }

  async getGamesByResultCompetition(
    competitionId: string,
    result: MatchResultEnum,
    teamId: string,
  ): Promise<FulfilledMatch[]> {
    // TODO: implement this method
    console.log(competitionId, result, teamId);
    return [];
  }

  async createMatch(emptyMatch: EmptyMatch): Promise<FulfilledMatch> {
    const result = await this.repository.save({
      ...emptyMatch,
      competition: {
        id: emptyMatch.competitionId,
      },
      awayTeam: { id: emptyMatch.awayTeamId },
      homeTeam: { id: emptyMatch.homeTeamId },
    });

    const createdMatch = await this.findById(result.id);
    return createdMatch;
  }

  async updateMatch(
    matchId: string,
    emptyMatch: EmptyMatch,
  ): Promise<FulfilledMatch> {
    await this.repository.update(matchId, {
      completed: emptyMatch.completed,
      location: emptyMatch.location,
      title: emptyMatch.title,
      matchDay: emptyMatch.matchDay,
      matchHour: emptyMatch.matchHour,
    });

    if (emptyMatch.homeTeamId) {
      await this.repository.update(matchId, {
        homeTeam: { id: emptyMatch.homeTeamId },
      });
    }

    if (emptyMatch.awayTeamId) {
      await this.repository.update(matchId, {
        awayTeam: { id: emptyMatch.awayTeamId },
      });
    }

    const updatedMatch = await this.findById(matchId);

    return updatedMatch;
  }

  async deleteMatch(matchId: string): Promise<void> {
    const match = await this.repository.findOne({ where: { id: matchId } });
    await this.repository.remove(match);
  }

  mapEntityToDomain(entity: TypeOrmMatchEntity): FulfilledMatch {
    return FulfilledMatch.make({
      awayScore: entity?.awayScore,
      homeScore: entity?.homeScore,
      awayTeam: entity?.awayTeam,
      homeTeam: entity?.homeTeam,
      completed: entity?.completed,
      createdAt: entity?.createdAt,
      id: entity?.id,
      location: entity?.location,
      matchDay: entity?.matchDay,
      matchHour: entity?.matchHour,
      competition: entity?.competition,
      competitionId: entity?.competition?.id,
      matchAparitions: entity?.matchAparitions,
      awayTeamId: entity?.awayTeam?.id,
      homeTeamId: entity?.homeTeam?.id,
      title: entity?.title,
      wo: entity?.wo,
    });
  }
}
