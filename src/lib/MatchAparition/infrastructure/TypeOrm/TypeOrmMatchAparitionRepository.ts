import { InjectRepository } from '@nestjs/typeorm';
import {
  EmptyMatchAparition,
  FulfilledMatchAparition,
} from '../../domain/matchAparition.schema';
import { MatchAparitionRepository } from '../../domain/MatchAparitionRepository';
import { TypeOrmMatchAparitionEntity } from './TypeOrmMatchAparitionEntity';
import { Repository } from 'typeorm';

export class TypeOrmMatchAparitionRepository
  implements MatchAparitionRepository
{
  constructor(
    @InjectRepository(TypeOrmMatchAparitionEntity)
    private readonly repository: Repository<TypeOrmMatchAparitionEntity>,
  ) {}

  async getAll(): Promise<FulfilledMatchAparition[]> {
    const aparitions = await this.repository.find();
    return aparitions.map(this.mapEntityToDomain);
  }

  async getByMatchId(matchId: string): Promise<FulfilledMatchAparition[]> {
    const aparitions = await this.repository.find({
      where: { match: { id: matchId } },
    });
    return aparitions.map(this.mapEntityToDomain);
  }

  async create(
    emptyMatchAparition: EmptyMatchAparition,
  ): Promise<FulfilledMatchAparition> {
    const createdAparition = await this.repository.save(emptyMatchAparition);
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
    return FulfilledMatchAparition.make(entity);
  }
}
