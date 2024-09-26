import { Repository } from 'typeorm';
import { TypeOrmTeamEntity } from './TypeOrmTeamEntity';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from '../../domain/Team';
import { TeamRepository } from '../../domain/TeamRepository';
import { TypeOrmSubscriptionEntity } from '@/lib/Subscription/infrastructure/TypeOrm/TypeOrmSubscriptionEntity';
import { NotFoundException } from '@nestjs/common';

export class TypeOrmTeamRepository implements TeamRepository {
  constructor(
    @InjectRepository(TypeOrmTeamEntity)
    private readonly repository: Repository<TypeOrmTeamEntity>,
    @InjectRepository(TypeOrmSubscriptionEntity)
    private readonly subscriptionRepository: Repository<TypeOrmSubscriptionEntity>,
  ) {}

  async getOneByName(name: string): Promise<Team | null> {
    const team = await this.repository.findOneBy({ name });
    return this.mapToDomain(team);
  }

  private mapToDomain(u: TypeOrmTeamEntity): Team {
    return Team.create({
      active: u.active,
      name: u.name,
      primaryColor: u.primaryColor,
      secondaryColor: u.secondaryColor,
      logoUrl: u.logoUrl,
      shieldUrl: u.shieldUrl,
      hasSubscription: u.hasSubscription,
      subscriptionId: u.subscription.id,
    });
  }

  async getAll(): Promise<Team[]> {
    const teams = await this.repository.find({ relations: ['subscription'] });
    return teams.map((u) => this.mapToDomain(u));
  }

  async getOneById(id: string): Promise<Team | null> {
    const team = await this.repository.findOne({
      where: {
        id: id,
      },
      relations: ['subscription'],
    });

    if (!team) return null;

    return this.mapToDomain(team);
  }

  async create(team: Team): Promise<Team> {
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
    const createdTeam = Team.create({
      ...result,
      subscriptionId: result.subscription.id,
      createdAt: result.createdAt,
    });
    createdTeam.id = result.id;

    return createdTeam;
  }

  async edit(team: Team): Promise<void> {
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
