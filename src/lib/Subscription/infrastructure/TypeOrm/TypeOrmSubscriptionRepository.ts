import { InjectRepository } from '@nestjs/typeorm';
import { SubscriptionRepository } from '../../domain/SubscriptionRepository';
import { TypeOrmSubscriptionEntity } from './TypeOrmSubscriptionEntity';
import { Repository } from 'typeorm';
import { Subscription } from '../../domain/Subscription';
import { NotFoundException } from '@nestjs/common';
import { TypeOrmTeamEntity } from '@/lib/Team/infrastructure/TypeOrm/TypeOrmTeamEntity';

export class TypeOrmSubscriptionRepository implements SubscriptionRepository {
  constructor(
    @InjectRepository(TypeOrmSubscriptionEntity)
    private readonly repository: Repository<TypeOrmSubscriptionEntity>,
    @InjectRepository(TypeOrmTeamEntity)
    private readonly teamRepository: Repository<TypeOrmTeamEntity>,
  ) {}
  async create(payload: Subscription): Promise<void> {
    // Logic to create a subscription

    // check if the plan exists
    const team = await this.teamRepository.findOne({
      where: { id: payload.teamId },
    });

    if (!team) throw new NotFoundException('Team not found');
    // check if the payment exists

    // This is an example of how to save a subscription
    const subscription = Subscription.create(payload);

    this.repository.save({
      team: { id: subscription.teamId },
      name: subscription.name,
      startDate: subscription.startDate,
      endDate: subscription.endDate,
      active: subscription.active,
    });
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
