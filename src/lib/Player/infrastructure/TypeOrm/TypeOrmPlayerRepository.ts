import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PlayerRepository } from '@/lib/Player/domain/PlayerRepository';
import { TypeOrmPlayerEntity } from '@/lib/Player/infrastructure/TypeOrm/TypeOrmPlayerEntity';
import {
  EmptyPlayer,
  FulfilledPlayer,
  UpdatePlayerType,
} from '../../domain/PlayerSchema';

export class TypeOrmPlayerRepository implements PlayerRepository {
  constructor(
    @InjectRepository(TypeOrmPlayerEntity)
    private readonly repository: Repository<TypeOrmPlayerEntity>,
  ) {}

  async create(player: EmptyPlayer): Promise<FulfilledPlayer> {
    const result = await this.repository.save({
      ...player,
      playerPositions: undefined,
      team: { id: player.team.id },
    });
    return this.mapToFulfilledPlayer(result);
  }

  async getAll(teamId: string): Promise<FulfilledPlayer[]> {
    const allPlayers = await this.repository.find({
      where: { team: { id: teamId } },
      relations: { team: true, playerPositions: { fieldPosition: true } },
    });
    const mappedPlayers = allPlayers.map((p) => this.mapToFulfilledPlayer(p));
    return mappedPlayers;
  }

  async getOneById(id: string): Promise<FulfilledPlayer> {
    const player = await this.repository.findOne({ where: { id } });
    return this.mapToFulfilledPlayer(player);
  }

  async edit(id: string, player: UpdatePlayerType): Promise<FulfilledPlayer> {
    await this.repository.update(id, { ...player });
    const updatedPlayer = await this.repository.findOne({ where: { id } });
    return this.mapToFulfilledPlayer(updatedPlayer);
  }

  async delete(id: string): Promise<void> {
    const playerToDelete = await this.repository.findOne({ where: { id } });
    await this.repository.remove(playerToDelete);
  }

  async getOneByDocumentNumber(
    documentNumber: string,
  ): Promise<FulfilledPlayer | null> {
    const player = await this.repository.findOne({
      where: { documentNumber },
    });
    return this.mapToFulfilledPlayer(player);
  }

  async getOneByEmail(email: string): Promise<FulfilledPlayer | null> {
    const player = await this.repository.findOne({
      where: { email },
    });
    return this.mapToFulfilledPlayer(player);
  }

  async getByPositionId(
    teamId: string,
    positionId: string,
  ): Promise<FulfilledPlayer[]> {
    const players = await this.repository.find({
      where: { team: { id: teamId }, favPosition: { id: positionId } },
    });
    const mappedPlayers = players.map((p) => this.mapToFulfilledPlayer(p));
    return mappedPlayers;
  }

  mapToFulfilledPlayer(entity: TypeOrmPlayerEntity) {
    if (!entity) return null;
    return new FulfilledPlayer({
      ...entity,
    });
  }
}
