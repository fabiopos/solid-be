import { InjectRepository } from '@nestjs/typeorm';
import { SubscriptionRepository } from '../../domain/SubscriptionRepository';
import { TypeOrmSubscriptionEntity } from './TypeOrmSubscriptionEntity';
import { Repository } from 'typeorm';
import { Subscription } from '../../domain/Subscription';
import { NotFoundException } from '@nestjs/common';
import { TypeOrmTeamEntity } from '@/lib/Team/infrastructure/TypeOrm/TypeOrmTeamEntity';
import { TypeOrmPlanEntity } from '@/lib/Plan/infrastructure/TypeOrm/TypeOrmPlanEntity';

export class TypeOrmSubscriptionRepository implements SubscriptionRepository {
  constructor(
    @InjectRepository(TypeOrmSubscriptionEntity)
    private readonly repository: Repository<TypeOrmSubscriptionEntity>,
    @InjectRepository(TypeOrmTeamEntity)
    private readonly teamRepository: Repository<TypeOrmTeamEntity>,
    @InjectRepository(TypeOrmPlanEntity)
    private readonly planRepository: Repository<TypeOrmPlanEntity>,
  ) {}

  async create(payload: Subscription): Promise<Subscription> {
    const subscription = Subscription.create({
      paymentId: payload.paymentId,
      planId: payload.planId,
      teams: payload.teams,
      user: payload.users[0],
    });

    console.log('Subscription.create', subscription);

    //const team = await this.teamRepository.save(payload.teams);

    // validate team

    // validate plan
    const plan = await this.planRepository.findOneBy({
      id: subscription.planId,
    });

    // check if user exists

    if (!plan) throw new NotFoundException('Plan not found');

    const createdSubscription = await this.repository.save({
      plan: plan,
      name: subscription.name,
      startDate: subscription.startDate,
      endDate: subscription.endDate,
      active: subscription.active,
    });

    console.log(createdSubscription);

    subscription.id = createdSubscription.id;

    return subscription;
  }

  async getAll(): Promise<Subscription[]> {
    return (await this.repository.find()).map((s) =>
      Subscription.fromPrimitives(s),
    );
  }

  async getOneById(id: string): Promise<Subscription | null> {
    const subscription = await this.repository.findOne({ where: { id } });
    return subscription ? Subscription.fromPrimitives(subscription) : null;
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
