import { InjectRepository } from '@nestjs/typeorm';
import { SubscriptionRepository } from '../../domain/SubscriptionRepository';
import { TypeOrmSubscriptionEntity } from './TypeOrmSubscriptionEntity';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { Subscription } from '../../domain/Subscription';
import { Logger, NotFoundException } from '@nestjs/common';
import { TypeOrmTeamEntity } from '@/lib/Team/infrastructure/TypeOrm/TypeOrmTeamEntity';
import { TypeOrmPlanEntity } from '@/lib/Plan/infrastructure/TypeOrm/TypeOrmPlanEntity';
import {
  EmptySubscription,
  FulfilledSubscription,
  planSchema,
  subscriptionToAddSchema,
} from '../../domain/SubscriptionSchema';
import { teamSchema } from '@/lib/Team/domain/TeamSchema';
import { playerSchema } from '@/lib/player/domain/PlayerSchema';
import { TypeOrmUserEntity } from '@/lib/User/infrastructure/TypeOrm/TypeOrmUserEntity';
import { TypeOrmSubscriptionFeatureEntity } from '@/lib/SubscriptionFeature/infrastructure/TypeOrm/TypeOrmSubscriptionFeatureEntity';
import { subscriptionFeatureSchema } from '@/lib/SubscriptionFeature/domain/SubscriptionFeatureSchema';
import { userSchema } from '@/lib/User/domain/UserSchema';

interface AddonPayload {
  queryRunner: QueryRunner;
  payload: EmptySubscription;
  subscription: TypeOrmSubscriptionEntity;
}
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

  private readonly logger = new Logger(TypeOrmSubscriptionRepository.name);

  async create(payload: EmptySubscription): Promise<FulfilledSubscription> {
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      const plan = await this.planRepository.findOneBy({
        id: payload.planId,
      });
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const createdSubscription = await this.insertSubscription(
        queryRunner,
        {
          ...payload,
          endDate: payload.endDate,
          name: payload.name,
          startDate: payload.startDate,
          active: payload.active,
        },
        plan,
      );

      const addOnPayload = {
        queryRunner,
        payload,
        subscription: createdSubscription,
      };
      // add users
      const addedUsers = await this.addUsersToSubscription(addOnPayload);

      // add teams
      const addedTeams = await this.addTeamsToSubscription(addOnPayload);

      // add features
      const addedFeatures = await this.addFeaturesToSubscription(addOnPayload);

      await queryRunner.commitTransaction();

      return new FulfilledSubscription({
        ...createdSubscription,
        plan: plan,
        planId: payload.planId,
        features: addedFeatures,
        teams: addedTeams,
        users: addedUsers,
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error('rollback subscription', error);

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
        users: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          documentNumber: true,
          documentType: true,
          policy: true,
        },
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
      relations: {
        plan: true,
        teams: { players: true },
        features: { feature: true },
      },
    });

    return new FulfilledSubscription({
      ...subscription,
      planId: subscription?.plan?.id,
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

  getSubscriptionToAdd = async (
    payload: EmptySubscription,
    plan: TypeOrmPlanEntity,
  ) => {
    const { active, endDate, name, startDate } = payload;

    return subscriptionToAddSchema.make({
      active,
      endDate,
      name,
      startDate,
      plan,
    });
  };

  insertSubscription = async (
    queryRunner: QueryRunner,
    emptySubscription: EmptySubscription,
    plan: TypeOrmPlanEntity,
  ) => {
    const subscriptionToAdd = await this.getSubscriptionToAdd(
      emptySubscription,
      plan,
    );

    const insertResultSubscription = await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(TypeOrmSubscriptionEntity)
      .values(subscriptionToAdd)
      .returning(['id'])
      .execute();

    const result = insertResultSubscription.generatedMaps[0];

    return queryRunner.manager
      .getRepository(TypeOrmSubscriptionEntity)
      .createQueryBuilder('subscription')
      .where('subscription.id = :id', { id: result.id })
      .getOne();
  };

  addUsersToSubscription = async ({
    queryRunner,
    payload,
    subscription,
  }: AddonPayload) => {
    const mappedUsers = payload.users.map((u) => ({
      ...u,
      subscription,
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
        'email',
      ])
      .execute();

    const results = insertResultUsers.generatedMaps;
    return results.map((u) =>
      userSchema.make({
        id: u.id,
        firstName: u.firstName,
        lastName: u.lastName,
        documentType: u.documentType,
        documentNumber: u.documentNumber,
        policy: u.policy,
        email: u.email,
      }),
    );
  };

  addTeamsToSubscription = async ({
    queryRunner,
    payload,
    subscription,
  }: AddonPayload) => {
    const mappedTeams = payload.teams.map((t) => ({
      ...t,
      subscription,
    }));

    const insertResultTeams = await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(TypeOrmTeamEntity)
      .values(mappedTeams)
      .returning(['id', 'name', 'hasSubscription', 'active'])
      .execute();

    const result = insertResultTeams.generatedMaps;
    return result.map((t) =>
      teamSchema.make({
        name: t.name,
        active: t.active,
        hasSubscription: t.hasSubscription,
        id: t.id,
        logoUrl: t.logoUrl,
        primaryColor: t.primaryColor,
        secondaryColor: t.secondaryColor,
        shieldUrl: t.shieldUrl,
      }),
    );
  };

  addFeaturesToSubscription = async ({
    queryRunner,
    payload,
    subscription,
  }: AddonPayload) => {
    const mappedFeatures = payload.features.map((f) => ({
      ...f,
      subscription,
    }));

    const insertResultFeatures = await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(TypeOrmSubscriptionFeatureEntity)
      .values(mappedFeatures)
      .returning(['createdAt', 'id', 'max', 'enabled', 'feature.id'])
      .execute();

    const result = insertResultFeatures.generatedMaps;

    return result.map((f) =>
      subscriptionFeatureSchema.make({
        id: f.id,
        createdAt: f.createdAt,
        max: f.max,
        enabled: f.enabled,
        featureId: f.feature,
      }),
    );
  };
}
