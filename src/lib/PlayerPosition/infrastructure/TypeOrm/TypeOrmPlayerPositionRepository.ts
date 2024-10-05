import { Repository } from 'typeorm';
import { PlayerPositionRepository } from '../../domain/PlayerPositionRepository';
import {
  EmptyPlayerPosition,
  FulfilledPlayerPosition,
} from '../../domain/PlayerPositionSchema';
import { TypeOrmPlayerPositionEntity } from './TypeOrmPlayerPositionEntity';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmPlayerEntity } from '@/lib/Player/infrastructure/TypeOrm/TypeOrmPlayerEntity';
import { TypeOrmFieldPositionEntity } from '@/lib/FieldPosition/infrastructure/TypeOrm/TypeOrmFieldPositionEntity';

export class TypeOrmPlayerPositionRepository
  implements PlayerPositionRepository
{
  constructor(
    @InjectRepository(TypeOrmPlayerPositionEntity)
    private readonly repository: Repository<TypeOrmPlayerPositionEntity>,
    @InjectRepository(TypeOrmPlayerEntity)
    private readonly playerRepository: Repository<TypeOrmPlayerEntity>,
    @InjectRepository(TypeOrmFieldPositionEntity)
    private readonly fieldRepository: Repository<TypeOrmFieldPositionEntity>,
  ) {}

  async create(item: EmptyPlayerPosition): Promise<FulfilledPlayerPosition> {
    const player = await this.playerRepository.findOneBy({
      id: item.player.id,
    });

    const fieldPosition = await this.fieldRepository.findOneBy({
      id: item.fieldPosition.id,
    });

    const result = await this.repository.save({
      fieldPosition,
      player,
    });
    return this.mapToFulfilled(result);
  }

  async createAll(item: EmptyPlayerPosition[]) {
    const promises = item.map((i) => this.create(i));
    return Promise.all(promises);
  }

  async update(
    id: string,
    item: EmptyPlayerPosition,
  ): Promise<FulfilledPlayerPosition> {
    const playerPosition = await this.repository.findOneBy({ id });
    const result = await this.repository.save({
      ...playerPosition,
      fieldPosition: item.fieldPosition,
    });
    return this.mapToFulfilled(result);
  }

  async delete(playerId: string): Promise<void> {
    const itemToDelete = await this.playerRepository.findOne({
      where: { id: playerId },
      relations: { playerPositions: true },
    });

    if (!itemToDelete) return;
    const ids = (itemToDelete.playerPositions ?? []).map((x) => x.id);
    if (ids.length > 0) await this.repository.delete(ids);
  }

  async getAllPositionsByPlayer(
    playerId: string,
  ): Promise<FulfilledPlayerPosition[]> {
    const results = await this.repository.find({
      where: { player: { id: playerId } },
    });
    return results.map(this.mapToFulfilled);
  }

  mapToFulfilled(item: TypeOrmPlayerPositionEntity) {
    return FulfilledPlayerPosition.make({
      fieldPosition: item.fieldPosition,
      player: item.player,
    });
  }
}