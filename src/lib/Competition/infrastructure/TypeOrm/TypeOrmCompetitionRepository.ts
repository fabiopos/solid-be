import { Repository } from 'typeorm';
import { CompetitionRepository } from '../../domain/CompetitionRepository';
import {
  EmptyCompetition,
  FulfilledCompetition,
} from '../../domain/CompetitionSchema';
import { TypeOrmCompetitionEntity } from './TypeOrmCompetitionEntity';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmSeasonEntity } from '@/lib/Season/infrastructure/TypeOrm/TypeOrmSeasonEntity';
import { FulfilledSeason } from '@/lib/Season/domain/SeasonSchema';
import { toDate } from 'date-fns';

export class TypeOrmCompetitionRepository implements CompetitionRepository {
  constructor(
    @InjectRepository(TypeOrmCompetitionEntity)
    private readonly repository: Repository<TypeOrmCompetitionEntity>,

    @InjectRepository(TypeOrmSeasonEntity)
    private readonly seasonRepository: Repository<TypeOrmSeasonEntity>,
  ) {}

  async getAllBySeason(seasonId: string): Promise<FulfilledCompetition[]> {
    const competitions = await this.repository.find({
      where: { season: { id: seasonId } },
      order: { startDate: 'ASC' },
    });

    return competitions.map(this.mapEntityToDomain);
  }

  async getAllByTeam(teamId: string): Promise<FulfilledCompetition[]> {
    const competitions = await this.repository.find({
      where: { season: { team: { id: teamId } } },
      order: { startDate: 'ASC' },
    });

    return competitions.map(this.mapEntityToDomain);
  }

  async findById(competitionId: string): Promise<FulfilledCompetition> {
    const competition = await this.repository.findOne({
      where: { id: competitionId },
      relations: { matches: { awayTeam: true, homeTeam: true }, season: true },
    });

    return this.mapEntityToDomain(competition);
  }

  async create(
    emptyCompetition: EmptyCompetition,
  ): Promise<FulfilledCompetition> {
    const createdCompetition = await this.repository.save({
      name: emptyCompetition.name,
      description: emptyCompetition.description,
      startDate: emptyCompetition.startDate,
      endDate: emptyCompetition.endDate,
      status: emptyCompetition.status,
      season: { id: emptyCompetition.seasonId },
    });

    return this.mapEntityToDomain(createdCompetition);
  }

  async update(
    competitionId: string,
    emptySeason: EmptyCompetition,
  ): Promise<FulfilledCompetition> {
    const competition = await this.repository.findOne({
      where: { id: competitionId },
    });

    competition.name = emptySeason.name;
    competition.description = emptySeason.description;
    competition.status = emptySeason.status;
    competition.startDate = emptySeason.startDate;
    competition.endDate = emptySeason.endDate;

    await this.repository.save(competition);
    const updatedCompetition = await this.repository.findOne({
      where: { id: competitionId },
      relations: { matches: true },
    });
    return this.mapEntityToDomain(updatedCompetition);
  }

  async delete(competitionId: string): Promise<void> {
    const competition = await this.repository.findOne({
      where: { id: competitionId },
    });

    if (competition) this.repository.remove(competition);
  }

  mapEntityToDomain(entity: TypeOrmCompetitionEntity): FulfilledCompetition {
    return FulfilledCompetition.make({
      id: entity?.id,
      description: entity?.description,
      name: entity?.name,
      seasonId: entity?.season?.id,
      startDate: entity?.startDate ? toDate(entity.startDate) : undefined,
      endDate: entity?.endDate ? toDate(entity.endDate) : undefined,
      status: entity?.status,
      createdAt: entity?.createdAt,
      matches: entity?.matches,
      season: entity?.season
        ? FulfilledSeason.make({
            active: entity?.season.active,
            createdAt: entity?.season.createdAt,
            description: entity?.season.description,
            endDate: entity?.season.endDate,
            startDate: entity?.season.startDate,
            id: entity?.season.id,
            name: entity.season.name,
            status: entity?.season.status,
            team: entity?.season.team,
            teamId: entity?.season.team?.id,
          })
        : undefined,
    });
  }
}
