import { InjectRepository } from '@nestjs/typeorm';
import { SubscriptionRepository } from '../../domain/SubscriptionRepository';
import { TypeOrmSubscriptionEntity } from './TypeOrmSubscriptionEntity';
import { DataSource, Repository } from 'typeorm';
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
import { TypeOrmUserEntity } from '@/lib/User/infrastructure/TypeOrm/TypeOrmUserEntity';
import { TypeOrmSubscriptionFeatureEntity } from '@/lib/SubscriptionFeature/infrastructure/TypeOrm/TypeOrmSubscriptionFeatureEntity';

export class TypeOrmSubscriptionRepository implements SubscriptionRepository {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(TypeOrmSubscriptionEntity)
    private readonly repository: Repository<TypeOrmSubscriptionEntity>,
    @InjectRepository(TypeOrmTeamEntity)
    private readonly teamRepository: Repository<TypeOrmTeamEntity>,
    @InjectRepository(TypeOrmPlanEntity)
    private readonly planRepository: Repository<TypeOrmPlanEntity>,
    @InjectRepository(TypeOrmUserEntity)
    private readonly userRepository: Repository<TypeOrmUserEntity>,
  ) {}

  async create(payload: EmptySubscription): Promise<FulfilledSubscription> {
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      // // validate plan
      const plan = await this.planRepository.findOneBy({
        id: payload.planId,
      });

      await queryRunner.connect();
      await queryRunner.startTransaction();

      // if (!plan) throw new NotFoundException('Plan not found');

      const { active, endDate, name, startDate } = payload;
      // check if user exists by email

      const subscriptionToAdd = {
        active,
        name,
        startDate,
        endDate,
        plan,
      };
      const insertResultSubscription = await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(TypeOrmSubscriptionEntity)
        .values(subscriptionToAdd)
        .execute();

      const result = insertResultSubscription.generatedMaps[0];
      const createdSubscription = {
        ...subscriptionToAdd,
        id: result.id,
        createdAt: result.createdAt,
        ...result,
      };

      // add users
      const mappedUsers = payload.users.map((u) => ({
        ...u,
        subscription: createdSubscription,
      }));

      const insertResultUsers = await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(TypeOrmUserEntity)
        .values(mappedUsers)
        .returning([
          'id',
          'firstName',
          'lastName',
          'documentType',
          'documentNumber',
          'policy',
        ])
        .execute();

      console.log(insertResultUsers);
      // const createdUsers = insertResultUsers.generatedMaps;

      // // add teams
      const mappedTeams = payload.teams.map((t) => ({
        ...t,
        subscription: createdSubscription,
      }));

      const insertResultTeams = await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(TypeOrmTeamEntity)
        .values(mappedTeams)
        .execute();

      console.log('insertResultTeams', insertResultTeams);

      const mappedFeatures = payload.features.map((f) => ({
        ...f,
        subscription: createdSubscription,
      }));

      const insertResultFeatures = await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(TypeOrmSubscriptionFeatureEntity)
        .values(mappedFeatures)
        .execute();

      console.log('insertResultFeatures', insertResultFeatures);
      // throw Error('Test error');

      await queryRunner.commitTransaction();
      // this.userRepository.save(mappedUsers, { transaction: true });

      // this.teamRepository.save(mappedTeams, { transaction: true });

      // add features

      return new FulfilledSubscription({
        active,
        id: createdSubscription.id,
        name,
        startDate,
        endDate,
        createdAt: createdSubscription.createdAt,
        plan: plan,
        planId: payload.planId,
        features: payload.features,
        users: payload.users,
        teams: payload.teams,
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.log('rollback subscription');

      throw error;
    } finally {
      await queryRunner.release();
    }
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
      relations: { plan: true, teams: { players: true }, features: true },
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
