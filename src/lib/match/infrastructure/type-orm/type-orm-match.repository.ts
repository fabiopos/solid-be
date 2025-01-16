import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmMatchEntity } from './type-orm-match.entity';
import { IsNull, Not, Raw, Repository } from 'typeorm';
import { TypeOrmTeamEntity } from '@/lib/Team/infrastructure/TypeOrm/TypeOrmTeamEntity';
import { MatchRepository } from '../../domain/match.repository';
import { MatchResultEnum } from '@/shared/enums/match.enum';
import { EmptyMatch, FulfilledMatch } from '../../domain/match.schema';
import { TypeOrmMatchAparitionEntity } from '@/lib/match-aparition/infrastructure/type-orm/type-orm-match-aparition.entity';

export class TypeOrmMatchRepository implements MatchRepository {
  constructor(
    @InjectRepository(TypeOrmMatchEntity)
    private readonly repository: Repository<TypeOrmMatchEntity>,

    @InjectRepository(TypeOrmTeamEntity)
    private readonly teamRepository: Repository<TypeOrmTeamEntity>,

    @InjectRepository(TypeOrmMatchAparitionEntity)
    private readonly matchAparitionRepository: Repository<TypeOrmMatchAparitionEntity>,
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

  async getAllByTeam(teamId: string): Promise<FulfilledMatch[]> {
    const matches = await this.repository.find({
      where: [
        {
          awayTeam: { id: teamId },
          completed: true,
          awayScore: Not(IsNull()),
          homeScore: Not(IsNull()),
        },
        {
          homeTeam: { id: teamId },
          completed: true,
          awayScore: Not(IsNull()),
          homeScore: Not(IsNull()),
        },
      ],
      relations: { homeTeam: true, awayTeam: true, competition: true },
      order: {
        matchDay: 'DESC',
      },
    });

    return matches.map(this.mapEntityToDomain);
  }

  async getLastMatchesByTeam(
    teamId: string,
    limit?: number,
  ): Promise<FulfilledMatch[]> {
    const matches = await this.repository.find({
      where: [
        {
          awayTeam: { id: teamId },
          completed: true,
          awayScore: Not(IsNull()),
          homeScore: Not(IsNull()),
          matchDay: Raw((alias) => `${alias} < NOW()`),
        },
        {
          homeTeam: { id: teamId },
          completed: true,
          awayScore: Not(IsNull()),
          homeScore: Not(IsNull()),
          matchDay: Raw((alias) => `${alias} < NOW()`),
        },
      ],
      relations: {
        homeTeam: true,
        awayTeam: true,
      },
      order: {
        matchDay: 'DESC',
      },
      take: limit,
    });

    return matches.map(this.mapEntityToDomain);
  }

  async getNextMatchesByTeam(
    teamId: string,
    limit?: number,
  ): Promise<FulfilledMatch[]> {
    const matches = await this.repository.find({
      where: [
        {
          awayTeam: { id: teamId },
          matchDay: Raw((alias) => `${alias} > NOW()`),
        },
        {
          homeTeam: { id: teamId },
          matchDay: Raw((alias) => `${alias} > NOW()`),
        },
      ],
      relations: {
        homeTeam: true,
        awayTeam: true,
      },
      order: {
        matchDay: 'DESC',
      },
      take: limit,
    });

    return matches.map(this.mapEntityToDomain);
  }

  async getAllByTeamCalendar(teamId: string): Promise<FulfilledMatch[]> {
    const matches = await this.repository.find({
      where: [
        {
          awayTeam: { id: teamId },
        },
        {
          homeTeam: { id: teamId },
        },
      ],
      relations: {
        competition: true,
      },
      order: {
        matchDay: 'DESC',
      },
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
    if (emptyMatch.completed !== undefined) {
      await this.repository.update(matchId, {
        completed: emptyMatch.completed,
      });
    }

    if (emptyMatch.location !== undefined) {
      await this.repository.update(matchId, {
        location: emptyMatch.location,
      });
    }

    if (emptyMatch.matchDay !== undefined) {
      await this.repository.update(matchId, {
        matchDay: emptyMatch.matchDay,
      });
    }

    if (emptyMatch.title !== undefined) {
      await this.repository.update(matchId, {
        title: emptyMatch.title,
      });
    }

    if (emptyMatch.matchHour !== undefined) {
      await this.repository.update(matchId, {
        matchHour: emptyMatch.matchHour,
      });
    }

    if (emptyMatch.awayScore !== undefined) {
      await this.repository.update(matchId, {
        awayScore: emptyMatch.awayScore,
      });
    }

    if (emptyMatch.homeScore !== undefined) {
      await this.repository.update(matchId, {
        homeScore: emptyMatch.homeScore,
      });
    }

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
    const aparitions = await this.matchAparitionRepository.find({
      where: { match: { id: matchId } },
    });
    await this.matchAparitionRepository.remove(aparitions);
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
