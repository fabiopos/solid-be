import { InjectRepository } from '@nestjs/typeorm';
import { SeasonRepository } from '../../domain/SeasonRepository';
import {
  EmptySeason,
  FulfilledSeason,
  PartialSeason,
} from '../../domain/SeasonSchema';
import { TypeOrmSeasonEntity } from './TypeOrmSeasonEntity';
import { Repository } from 'typeorm';
import { TypeOrmTeamEntity } from '@/lib/Team/infrastructure/TypeOrm/TypeOrmTeamEntity';
import { NotFoundException } from '@nestjs/common';
import { toDate } from 'date-fns';

export class TypeOrmSeasonRepository implements SeasonRepository {
  constructor(
    @InjectRepository(TypeOrmSeasonEntity)
    private readonly repository: Repository<TypeOrmSeasonEntity>,

    @InjectRepository(TypeOrmTeamEntity)
    private readonly teamRepository: Repository<TypeOrmTeamEntity>,
  ) {}
  async find(seasonId: string): Promise<FulfilledSeason> {
    const season = await this.repository.findOne({
      where: { id: seasonId },
      relations: {
        competitions: { matches: true },
        team: true,
      },
    });
    return this.mapEntityToDomain(season);
  }

  async getSeasonTreeByTeam(teamId: string): Promise<FulfilledSeason[]> {
    const seasons = await this.repository.find({
      where: [
        {
          team: { id: teamId },
          competitions: {
            matches: {
              awayTeam: { id: teamId },
            },
          },
        },
        //or
        {
          team: { id: teamId },
          competitions: {
            matches: {
              homeTeam: { id: teamId },
            },
          },
        },
      ],
      relations: {
        competitions: { matches: { homeTeam: true, awayTeam: true } },
      },
    });
    return seasons.map(this.mapEntityToDomain);
  }

  async getAllBySubscription(
    subscriptionId: string,
  ): Promise<FulfilledSeason[]> {
    const seasons = await this.repository.find({
      where: { team: { subscription: { id: subscriptionId } } },
      relations: { competitions: true },
    });

    return seasons.map(this.mapEntityToDomain);
  }

  async update(seasonId: string, partialSeason: PartialSeason) {
    const seasonToUpdate = await this.repository.findOne({
      where: { id: seasonId },
    });

    const seasonUpdated = await this.repository.save({
      ...seasonToUpdate,
      ...partialSeason,
    });

    return this.mapEntityToDomain(seasonUpdated);
  }

  async create(emptySeason: EmptySeason): Promise<FulfilledSeason> {
    const team = await this.teamRepository.findOne({
      where: { id: emptySeason.teamId },
    });

    if (!team) throw new NotFoundException();

    const result = await this.repository.save({ ...emptySeason, team });

    return this.mapEntityToDomain(result);
  }

  async getAll(teamId: string): Promise<FulfilledSeason[]> {
    const seasons = await this.repository.find({
      where: { team: { id: teamId } },
      relations: { competitions: true, team: true },
    });

    return seasons.map(this.mapEntityToDomain);
  }

  async deleteSeason(seasonId: string) {
    await this.repository.delete({ id: seasonId });
  }

  mapEntityToDomain(entity: TypeOrmSeasonEntity): FulfilledSeason {
    return FulfilledSeason.make({
      active: entity?.active,
      competitions: (entity.competitions ?? []).map((x) => ({
        name: x.name,
        id: x.id,
        startDate: toDate(x.startDate),
        endDate: toDate(x.endDate),
        description: x.description,
        status: x.status,
        matches: x.matches,
      })),
      createdAt: entity.createdAt,
      description: entity.description,
      id: entity.id,
      name: entity.name,
      status: entity.status,
      team: entity.team,
      teamId: entity.team?.id,
      endDate: entity.endDate,
      startDate: entity.startDate,
    });
  }
}
