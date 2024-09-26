import { InjectRepository } from '@nestjs/typeorm';
import { SubscriptionRepository } from '../../domain/SubscriptionRepository';
import { TypeOrmSubscriptionEntity } from './TypeOrmSubscriptionEntity';
import { Repository } from 'typeorm';
import { Subscription } from '../../domain/Subscription';
import { NotFoundException } from '@nestjs/common';
import { TypeOrmTeamEntity } from '@/lib/Team/infrastructure/TypeOrm/TypeOrmTeamEntity';
import { TypeOrmPlanEntity } from '@/lib/Plan/infrastructure/TypeOrm/TypeOrmPlanEntity';
import {
  EmptySubscription,
  FulfilledSubscription,
  planSchema,
} from '../../domain/SubscriptionSchema';
import { teamSchema } from '@/lib/Team/domain/TeamSchema';
import { playerSchema } from '@/lib/Player/domain/PlayerSchema';

export class TypeOrmSubscriptionRepository implements SubscriptionRepository {
  constructor(
    @InjectRepository(TypeOrmSubscriptionEntity)
    private readonly repository: Repository<TypeOrmSubscriptionEntity>,
    @InjectRepository(TypeOrmTeamEntity)
    private readonly teamRepository: Repository<TypeOrmTeamEntity>,
    @InjectRepository(TypeOrmPlanEntity)
    private readonly planRepository: Repository<TypeOrmPlanEntity>,
  ) {}

  async create(payload: EmptySubscription): Promise<FulfilledSubscription> {
    // validate plan
    const plan = await this.planRepository.findOneBy({
      id: payload.planId,
    });

    if (!plan) throw new NotFoundException('Plan not found');

    // check if user exists by email
    const { active, id, name, startDate, endDate, createdAt, planId } =
      await this.repository.save(payload);

    return new FulfilledSubscription({
      active,
      id,
      name,
      startDate,
      endDate,
      createdAt,
      plan: plan,
      planId,
    });
  }

  async getAll(): Promise<FulfilledSubscription[]> {
    const subs = await this.repository.find({
      relations: { plan: true, teams: true, users: true },
      order: { createdAt: 'DESC' },
      select: {
        id: true,
        name: true,
        active: true,
        startDate: true,
        endDate: true,
        plan: {
          id: true,
          name: true,
          interval: true,
          intervalCount: true,
          active: true,
        },
        payment: { id: true, currency: true, description: true },
        features: { id: true, enabled: true },
        teams: { name: true, active: true, id: true },
        users: { firstName: true, lastName: true, email: true },
      },
    });

    return subs.map(
      (s) =>
        new FulfilledSubscription({
          ...s,
          planId: s.plan.id,
          plan: planSchema.make({ ...s.plan }),
          teams: s.teams.map((team) =>
            teamSchema.make({
              ...team,
              subscriptionId: s.id,
              players: [],
            }),
          ),
        }),
    );
  }

  async getOneById(id: string): Promise<FulfilledSubscription | null> {
    const subscription = await this.repository.findOne({
      where: { id },
      relations: { plan: true, teams: { players: true } },
    });
    return new FulfilledSubscription({
      ...subscription,
      planId: subscription.plan.id,
      teams: subscription.teams.map((team) =>
        teamSchema.make({
          ...team,
          subscriptionId: subscription.id,
          players: team.players.map((player) =>
            playerSchema.make({ ...player, teamId: team.id }),
          ),
        }),
      ),
    });
  }

  async edit(subscription: Subscription): Promise<void> {
    throw new Error('Method not implemented.' + subscription.id);
  }

  async delete(id: string): Promise<void> {
    const subscription = await this.repository.findOne({ where: { id } });
    if (!subscription) throw new NotFoundException('Subscription not found');

    await this.repository.remove(subscription);
  }
}
