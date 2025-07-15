import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { PlayerRepository } from '../../../../lib/player/domain/player.repository';
import { TypeOrmPlayerEntity } from '../../../../lib/player/infrastructure/type-orm/type-orm-player.entity';
import {
  EmptyPlayer,
  FulfilledPlayer,
  UpdatePlayerType,
} from '../../domain/player.schema';
import { Logger } from '@nestjs/common';

export class TypeOrmPlayerRepository implements PlayerRepository {
  constructor(
    @InjectRepository(TypeOrmPlayerEntity)
    private readonly repository: Repository<TypeOrmPlayerEntity>,
  ) {}

  private readonly logger = new Logger(TypeOrmPlayerRepository.name);

  async updatePlayerPositions(pid: string, favPosition: string): Promise<void> {
    const player = await this.repository.findOne({ where: { id: pid } });

    if (!player) {
      throw new Error('Player not found');
    }

    if (favPosition) {
      this.logger.log('updating fav position', pid, favPosition);

      await this.repository.save({
        ...player,
        favPosition: { id: favPosition },
      });
    }

    return;
  }

  async create(player: EmptyPlayer): Promise<FulfilledPlayer> {
    const result = await this.repository.save({
      ...player,
      playerPositions: undefined,
      team: { id: player.team.id },
    });
    return this.mapToFulfilledPlayer(result);
  }

  // exclude inactive players
  async getAll(teamId: string): Promise<FulfilledPlayer[]> {
    const allPlayers = await this.repository.find({
      where: { team: { id: teamId }, active: true },
      relations: {
        team: true,
        favPosition: true,
        playerPositions: { fieldPosition: true },
      },
      order: { favPosition: { order: 'ASC' }, shirtNumber: 'ASC' },
    });
    const mappedPlayers = allPlayers.map((p) => this.mapToFulfilledPlayer(p));
    return mappedPlayers;
  }

  async getAllByTeam(
    teamId: string,
    limit?: number,
  ): Promise<FulfilledPlayer[]> {
    const allPlayers = await this.repository.find({
      where: { team: { id: teamId } },
      relations: {
        team: true,
        favPosition: true,
        playerPositions: { fieldPosition: true },
        matchAparitions: true,
      },
      order: { createdAt: 'DESC' },
      take: limit,
    });
    const mappedPlayers = allPlayers.map((p) => this.mapToFulfilledPlayer(p));
    return mappedPlayers;
  }

  async getAllByTeamWithFilters(
    teamId: string,
    limit?: number,
  ): Promise<FulfilledPlayer[]> {
    const allPlayers = await this.repository.find({
      where: { team: { id: teamId } },
      relations: {
        team: true,
        favPosition: true,
        playerPositions: { fieldPosition: true },
        matchAparitions: true,
      },
      order: { shirtName: 'ASC' },
      take: limit,
    });
    const mappedPlayers = allPlayers.map((p) => this.mapToFulfilledPlayer(p));
    return mappedPlayers;
  }

  async getOneById(id: string): Promise<FulfilledPlayer> {
    const player = await this.repository.findOne({
      where: { id },
      relations: {
        team: true,
        favPosition: true,
        injuries: true,
        matchAparitions: {
          match: { competition: true, homeTeam: true, awayTeam: true },
        },
      },
      order: {
        matchAparitions: { match: { matchDay: 'DESC' } },
      },
    });
    return this.mapToFulfilledPlayer(player);
  }

  async edit(id: string, payload: UpdatePlayerType): Promise<FulfilledPlayer> {
    const player = await this.repository.findOne({ where: { id } });

    player.active = payload.active;
    player.firstName = payload.firstName;
    player.lastName = payload.lastName;
    player.address = payload.address;
    player.arl = payload.arl;

    if (payload.avatarUrl) {
      player.avatarUrl = payload.avatarUrl;
      this.logger.log('edit repo', 'avatarUrl', payload.avatarUrl);
    }
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

    let favPosition = undefined;

    if (payload.favPositionId) {
      favPosition = { id: payload.favPositionId };
    }
    this.logger.log('updating player', player.id, player.bornDate);

    await this.repository.save({
      ...player,
      favPosition,
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

    return FulfilledPlayer.make({
      favPositionId: entity.favPosition?.id,
      matchAparitions: entity.matchAparitions,
      ...entity,
    });
  }
}
