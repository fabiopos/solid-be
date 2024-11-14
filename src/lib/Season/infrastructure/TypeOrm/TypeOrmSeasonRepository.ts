import { InjectRepository } from '@nestjs/typeorm';
import { SeasonRepository } from '../../domain/SeasonRepository';
import { EmptySeason, FulfilledSeason } from '../../domain/SeasonSchema';
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

  mapEntityToDomain(entity: TypeOrmSeasonEntity): FulfilledSeason {
    return FulfilledSeason.make({
      active: entity.active,
      competitions: (entity.competitions ?? []).map((x) => ({
        name: x.name,
        id: x.id,
        startDate: toDate(x.startDate),
        endDate: toDate(x.endDate),
        status: x.status,
      })),
      createdAt: entity.createdAt,
      description: entity.description,
      id: entity.id,
      name: entity.name,
      status: entity.status,
      team: entity.team,
      teamId: entity.team.id,
      endDate: entity.endDate,
      startDate: entity.startDate,
    });
  }
}
