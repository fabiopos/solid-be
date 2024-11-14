import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

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
      relations: {
        team: true,
        favPosition: true,
        playerPositions: { fieldPosition: true },
      },
    });
    const mappedPlayers = allPlayers.map((p) => this.mapToFulfilledPlayer(p));
    return mappedPlayers;
  }

  async getOneById(id: string): Promise<FulfilledPlayer> {
    const player = await this.repository.findOne({ where: { id } });
    return this.mapToFulfilledPlayer(player);
  }

  async edit(id: string, payload: UpdatePlayerType): Promise<FulfilledPlayer> {
    const player = await this.repository.findOne({ where: { id } });

    player.active = payload.active;
    player.firstName = payload.firstName;
    player.lastName = payload.lastName;
    player.address = payload.address;
    player.arl = payload.arl;
    player.avatarUrl = payload.avatarUrl;
    player.city = payload.city;
    player.country = payload.country;
    player.dominantFoot = payload.dominantFoot;
    player.status = payload.status;
    player.shirtName = payload.shirtName;
    player.eps = payload.eps;
    player.shirtSize = payload.shirtSize;
    player.height = payload.height;
    player.weight = payload.weight;
    player.shirtNumber = payload.shirtNumber;
    player.phone = payload.phone;
    player.bornDate = payload.bornDate;

    await this.repository.save({
      ...player,
      favPosition: { id: payload.favPositionId },
    });

    return this.mapToFulfilledPlayer(player);
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

  async searchByName(teamId: string, name: string): Promise<FulfilledPlayer[]> {
    const players = await this.repository.find({
      where: [
        {
          firstName: ILike(`%${name}%`),
          team: { id: teamId },
          active: true,
        },
        {
          lastName: ILike(`%${name}%`),
          team: { id: teamId },
          active: true,
        },
        { shirtName: ILike(`%${name}%`), team: { id: teamId }, active: true },
      ],
      order: { firstName: 'ASC', lastName: 'ASC' },
    });

    return players.map(this.mapToFulfilledPlayer);
  }

  mapToFulfilledPlayer(entity: TypeOrmPlayerEntity) {
    if (!entity) return null;

    console.log('entity borndate', entity.bornDate);
    return FulfilledPlayer.make({
      ...entity,
    });
  }
}
