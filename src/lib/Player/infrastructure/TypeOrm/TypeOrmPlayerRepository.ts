import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '@/lib/Player/domain/Player';
import { PlayerRepository } from '@/lib/Player/domain/PlayerRepository';
import { TypeOrmPlayerEntity } from '@/lib/Player/infrastructure/TypeOrm/TypeOrmPlayerEntity';

export class TypeOrmPlayerRepository implements PlayerRepository {
  constructor(
    @InjectRepository(TypeOrmPlayerEntity)
    private readonly repository: Repository<TypeOrmPlayerEntity>,
  ) {}

  async getOneByDocumentNumber(documentNumber: string): Promise<Player | null> {
    const player = await this.repository.findOne({
      where: {
        documentNumber: documentNumber,
      },
    });

    if (!player) return null;

    return this.mapToDomain(player);
  }

  private mapToDomain(u: TypeOrmPlayerEntity) {
    return Player.create({
      active: u.active,
      address: u.address,
      arl: u.arl,
      avatarUrl: u.avatarUrl,
      city: u.city,
      country: u.country,
      documentNumber: u.documentNumber,
      documentType: u.documentType,
      dominantFoot: u.dominantFoot,
      email: u.email,
      eps: u.eps,
      firstName: u.firstName,
      height: u.height,
      id: u.id,
      lastName: u.lastName,
      phone: u.phone,
      shirtName: u.shirtName,
      shirtNumber: u.shirtNumber,
      shirtSize: u.shirtSize,
      favPositionId: u.favPosition?.id,
      teamId: u.team?.id,
    });
  }

  async getAll(): Promise<Player[]> {
    const players = await this.repository.find({
      relations: ['team', 'favPosition'],
    });

    return players.map((u) => this.mapToDomain(u));
  }

  async getOneById(id: string): Promise<Player | null> {
    const player = await this.repository.findOne({
      where: {
        id: id,
      },
    });

    if (!player) return null;

    return this.mapToDomain(player);
  }

  async create(player: Player): Promise<void> {
    await this.repository.save({
      firstName: player.firstName,
      lastName: player.lastName,
      documentNumber: player.documentNumber,
      documentType: player.documentType,
      active: player.active,
      avatarUrl: player.avatarUrl,
      phone: player.phone,
      email: player.email,
      address: player.address,
      city: player.city,
      country: player.country,
      teamId: player.teamId,
      shirtSize: player.shirtSize,
      shirtName: player.shirtName,
      shirtNumber: player.shirtNumber,
      favPositionId: player.favPositionId,
      height: player.height,
      dominantFoot: player.dominantFoot,
      eps: player.eps,
      arl: player.arl,
    });
  }

  async edit(player: Player): Promise<void> {
    await this.repository.update(player.id, {
      firstName: player.firstName,
      lastName: player.lastName,
      documentNumber: player.documentNumber,
      documentType: player.documentType,
      active: player.active,
      avatarUrl: player.avatarUrl,
      phone: player.phone,
      email: player.email,
      address: player.address,
      city: player.city,
      country: player.country,
      shirtSize: player.shirtSize,
      height: player.height,
      dominantFoot: player.dominantFoot,
      eps: player.eps,
      arl: player.arl,
    });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
