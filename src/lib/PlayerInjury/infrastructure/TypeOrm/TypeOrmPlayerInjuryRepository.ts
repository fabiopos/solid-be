import { InjectRepository } from '@nestjs/typeorm';
import {
  EmptyPlayerInjury,
  FulfilledPlayerInjury,
  PartialPlayerInjury,
} from '../../domain/playerInjury.schema';
import { PlayerInjuryRepository } from '../../domain/PlayerInjuryRepository';
import { TypeOrmPlayerInjuryEntity } from './TypeOrmPlayerInjuryEntity';
import { Repository } from 'typeorm';

export class TypeOrmPlayerInjuryRepository implements PlayerInjuryRepository {
  constructor(
    @InjectRepository(TypeOrmPlayerInjuryEntity)
    private readonly repository: Repository<TypeOrmPlayerInjuryEntity>,
  ) {}

  async getAll(): Promise<FulfilledPlayerInjury[]> {
    const injuries = await this.repository.find();
    return injuries.map(this.mapEntityToDomain);
  }
  async getAllByPlayerId(playerId: string): Promise<FulfilledPlayerInjury[]> {
    const injuries = await this.repository.find({
      where: { player: { id: playerId } },
    });
    return injuries.map(this.mapEntityToDomain);
  }
  async create(
    emptyPlayerInjury: EmptyPlayerInjury,
  ): Promise<FulfilledPlayerInjury> {
    const createdInjury = await this.repository.save(emptyPlayerInjury);
    return this.mapEntityToDomain(createdInjury);
  }
  async update(
    playerInjuryId: string,
    partialPlayerInjury: PartialPlayerInjury,
  ): Promise<FulfilledPlayerInjury> {
    const currentInjury = await this.repository.findOne({
      where: { id: playerInjuryId },
    });
    const createdInjury = await this.repository.save({
      ...currentInjury,
      ...partialPlayerInjury,
    });
    return this.mapEntityToDomain(createdInjury);
  }
  async delete(playerInjuryId: string): Promise<void> {
    await this.repository.delete({ id: playerInjuryId });
  }

  mapEntityToDomain(entity: TypeOrmPlayerInjuryEntity): FulfilledPlayerInjury {
    return FulfilledPlayerInjury.make(entity);
  }
}
