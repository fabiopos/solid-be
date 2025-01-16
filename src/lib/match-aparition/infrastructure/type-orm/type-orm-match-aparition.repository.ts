import { InjectRepository } from '@nestjs/typeorm';
import {
  EmptyMatchAparition,
  FulfilledMatchAparition,
  FulfilledScorer,
} from '../../domain/match-aparition.schema';
import { MatchAparitionRepository } from '../../domain/match-aparition.repository';
import { TypeOrmMatchAparitionEntity } from './type-orm-match-aparition.entity';
import { Repository } from 'typeorm';

export class TypeOrmMatchAparitionRepository
  implements MatchAparitionRepository
{
  constructor(
    @InjectRepository(TypeOrmMatchAparitionEntity)
    private readonly repository: Repository<TypeOrmMatchAparitionEntity>,
  ) {}

  async getAll(): Promise<FulfilledMatchAparition[]> {
    const aparitions = await this.repository.find({
      relations: { player: true, match: true },
      order: { player: { firstName: 'ASC' } },
    });
    return aparitions.map(this.mapEntityToDomain);
  }

  async getAllByTeam(teamId: string): Promise<FulfilledMatchAparition[]> {
    const aparitions = await this.repository.find({
      where: {
        player: { team: { id: teamId } },
      },
      order: { player: { firstName: 'ASC' } },
      relations: { match: true, player: true },
    });
    return aparitions.map(this.mapEntityToDomain);
  }

  async getAllSortTopScorers(teamId: string): Promise<FulfilledScorer[]> {
    const scorers = await this.repository
      .createQueryBuilder('ap')
      .leftJoinAndSelect('ap.player', 'pl')
      .leftJoinAndSelect('ap.match', 'ma')
      .leftJoinAndSelect('pl.team', 'te')
      .select(['ap.playerId'])
      .addSelect('SUM(ap.goals)', 'goals')
      .groupBy('ap.playerId')
      .where(`goals > 0`)
      .where(`te.id='${teamId}'`)
      .where('ma.completed=true')
      .having('SUM(ap.goals) > 0')
      .limit(5)
      .orderBy('goals', 'DESC')
      .getRawMany();

    return scorers.map((r) =>
      FulfilledScorer.make({
        goals: Number(r.goals),
        id: r.playerId,
        name: '',
        shirtName: '',
        avatarUrl: '',
        shirtNumber: 0,
      }),
    );
  }

  async getAllSortTopAsists(
    teamId: string,
  ): Promise<FulfilledMatchAparition[]> {
    const aparitions = await this.repository
      .createQueryBuilder('ap')
      .leftJoinAndSelect('ap.player', 'pl')
      .leftJoinAndSelect('ap.match', 'ma')
      .leftJoinAndSelect('pl.team', 'te')
      .where('ma.completed=true')
      .where(`te.id='${teamId}'`)
      .where(`ap.assists > 0`)
      .groupBy('pl.id')
      .addGroupBy('ap.id')
      .addGroupBy('ma.id')
      .addGroupBy('te.id')
      .select([
        'ap.id',
        'pl.id',
        'pl.shirtNumber',
        'pl.shirtName',
        'pl.favPositionId',
        'pl.firstName',
        'pl.lastName',
        'pl.avatarUrl',
        'ap.assists',
      ])
      .limit(10)
      .orderBy('ap.assists', 'DESC')
      .getMany();

    return aparitions.map(this.mapEntityToDomain);
  }

  async getByMatchId(matchId: string): Promise<FulfilledMatchAparition[]> {
    const aparitions = await this.repository.find({
      where: { match: { id: matchId } },
      relations: { player: { favPosition: true } },
      order: { player: { firstName: 'ASC' } },
    });
    return aparitions.map(this.mapEntityToDomain);
  }

  async create(
    emptyMatchAparition: EmptyMatchAparition,
  ): Promise<FulfilledMatchAparition> {
    const createdAparition = await this.repository.save({
      ...emptyMatchAparition,
      player: { id: emptyMatchAparition.playerId },
      match: { id: emptyMatchAparition.matchId },
    });
    return this.mapEntityToDomain(createdAparition);
  }
  async update(
    matchAparitionId: string,
    emptyMatchAparition: EmptyMatchAparition,
  ): Promise<FulfilledMatchAparition> {
    const currentAp = await this.repository.findOne({
      where: { id: matchAparitionId },
    });

    const updatedAparition = await this.repository.save({
      ...currentAp,
      ...emptyMatchAparition,
    });

    return this.mapEntityToDomain(updatedAparition);
  }
  async delete(matchAparitionId: string): Promise<void> {
    await this.repository.delete({ id: matchAparitionId });
  }

  mapEntityToDomain(
    entity: TypeOrmMatchAparitionEntity,
  ): FulfilledMatchAparition {
    return FulfilledMatchAparition.make({
      ...entity,
      player: {
        favPosition: entity.player?.favPosition,
        firstName: entity.player?.firstName,
        id: entity.player?.id,
        lastName: entity.player?.lastName,
        shirtName: entity.player?.shirtName,
        shirtNumber: entity.player?.shirtNumber,
        avatarUrl: entity.player?.avatarUrl,
      },
    });
  }
}
