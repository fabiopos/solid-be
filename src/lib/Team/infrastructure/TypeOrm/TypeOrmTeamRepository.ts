import { Repository } from 'typeorm';
import { TypeOrmTeamEntity } from './TypeOrmTeamEntity';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from '../../domain/Team';
import { TeamRepository } from '../../domain/TeamRepository';
import { TypeOrmSubscriptionEntity } from '@/lib/Subscription/infrastructure/TypeOrm/TypeOrmSubscriptionEntity';
import { NotFoundException } from '@nestjs/common';
import { FulfilledTeam, TeamType } from '../../domain/TeamSchema';

export class TypeOrmTeamRepository implements TeamRepository {
  constructor(
    @InjectRepository(TypeOrmTeamEntity)
    private readonly repository: Repository<TypeOrmTeamEntity>,
    @InjectRepository(TypeOrmSubscriptionEntity)
    private readonly subscriptionRepository: Repository<TypeOrmSubscriptionEntity>,
  ) {}

  async getOneByName(name: string): Promise<FulfilledTeam> {
    const team = await this.repository.findOneBy({ name });
    return this.mapToDomain(team);
  }

  private mapToDomain(u: TypeOrmTeamEntity): FulfilledTeam {
    const t = FulfilledTeam.make(u);
    return t;
  }

  async getAll(subscriptionId: string): Promise<FulfilledTeam[]> {
    const teams = await this.repository.find({
      where: { subscription: { id: subscriptionId } },
      relations: {
        subscription: true,
      },
      order: { createdAt: 'DESC' },
    });
    return teams.map((u) => this.mapToDomain(u));
  }

  async getOneById(id: string): Promise<FulfilledTeam> {
    const team = await this.repository.findOne({
      where: {
        id: id,
      },
      relations: {
        subscription: true,
        players: true,
      },
    });

    if (!team) return null;

    return this.mapToDomain(team);
  }

  async create(team: Team): Promise<FulfilledTeam> {
    const subscription = await this.subscriptionRepository.findOneBy({
      id: team.subscriptionId,
    });

    if (!subscription) throw new NotFoundException('Subscription not found');

    const result = await this.repository.save({
      name: team.name,
      active: team.active,
      primaryColor: team.primaryColor,
      secondaryColor: team.secondaryColor,
      logoUrl: team.logoUrl,
      shieldUrl: team.shieldUrl,
      hasSubscription: team.hasSubscription,
      subscription: subscription,
    });
    const createdTeam = FulfilledTeam.make({
      ...result,
      id: result.id,
      subscriptionId: result.subscription.id,
      createdAt: result.createdAt,
    });

    return createdTeam;
  }

  async edit(team: TeamType): Promise<void> {
    await this.repository.update(team.id, {
      name: team.name,
      active: team.active,
      primaryColor: team.primaryColor,
      secondaryColor: team.secondaryColor,
      logoUrl: team.logoUrl,
      shieldUrl: team.shieldUrl,
    });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
