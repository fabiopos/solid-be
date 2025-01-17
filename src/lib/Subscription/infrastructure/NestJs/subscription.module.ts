import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SubscriptionController } from './subscription.controller';

import { TypeOrmSubscriptionEntity } from '../type-orm/type-orm-subscription.entity';
import { TypeOrmSubscriptionRepository } from '../type-orm/type-orm-subscription.repository';

import { SubscriptionCreate } from '../../application/subscription-create/SubscriptionCreate';
import { SubscriptionGetAll } from '../../application/subscription-getall/subscription.getall';
import { SubscriptionFind } from '../../application/subscription-find/subscription.find';

import { TypeOrmTeamEntity } from '../../../../lib/team/infrastructure/TypeOrm/TypeOrmTeamEntity';
import { TypeOrmTeamRepository } from '../../../../lib/team/infrastructure/TypeOrm/TypeOrmTeamRepository';
import { TypeOrmPlanRepository } from '../../../../lib/plan/infrastructure/type-orm/type-orm-plan.repository';
import { TypeOrmPlanEntity } from '../../../../lib/plan/infrastructure/type-orm/type-orm-plan.entity';
import { TypeOrmUserRepository } from '../../../../lib/user/infrastructure/TypeOrm/TypeOrmUserRepository';
import { TypeOrmUserEntity } from '../../../../lib/user/infrastructure/TypeOrm/TypeOrmUserEntity';
import { TypeOrmPlayerRepository } from '../../../../lib/player/infrastructure/type-orm/type-orm-player.repository';
import { TypeOrmPlayerEntity } from '../../../../lib/player/infrastructure/type-orm/type-orm-player.entity';
import { TypeOrmSubscriptionFeatureRepository } from '../../../../lib/subscription-feature/infrastructure/type-orm/type-orm-subscription-feature.repository';
import { TypeOrmSubscriptionFeatureEntity } from '../../../../lib/subscription-feature/infrastructure/type-orm/type-orm-subscription-feature.entity';
import { TypeOrmFeatureRepository } from '../../../../lib/feature/infrastructure/type-orm/type-orm-feature.repository';
import { TypeOrmFeatureEntity } from '../../../../lib/feature/infrastructure/type-orm/type-orm-feature.entity';
import { JWT_OPTIONS } from '../../../../utils/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeOrmSubscriptionEntity]),
    TypeOrmModule.forFeature([TypeOrmTeamEntity]),
    TypeOrmModule.forFeature([TypeOrmPlanEntity]),
    TypeOrmModule.forFeature([TypeOrmUserEntity]),
    TypeOrmModule.forFeature([TypeOrmPlayerEntity]),
    TypeOrmModule.forFeature([TypeOrmSubscriptionFeatureEntity]),
    TypeOrmModule.forFeature([TypeOrmFeatureEntity]),
    JwtModule.register(JWT_OPTIONS),
  ],
  controllers: [SubscriptionController],
  providers: [
    {
      provide: 'SubscriptionRepository',
      useClass: TypeOrmSubscriptionRepository,
    },
    {
      provide: 'TeamRepository',
      useClass: TypeOrmTeamRepository,
    },
    {
      provide: 'PlanRepository',
      useClass: TypeOrmPlanRepository,
    },
    {
      provide: 'UserRepository',
      useClass: TypeOrmUserRepository,
    },
    {
      provide: 'PlayerRepository',
      useClass: TypeOrmPlayerRepository,
    },
    {
      provide: 'SubscriptionFeatureRepository',
      useClass: TypeOrmSubscriptionFeatureRepository,
    },
    {
      provide: 'FeatureRepository',
      useClass: TypeOrmFeatureRepository,
    },
    {
      provide: 'SubscriptionGetAll',
      useFactory: (repository: TypeOrmSubscriptionRepository) =>
        new SubscriptionGetAll(repository),
      inject: ['SubscriptionRepository'],
    },
    {
      provide: 'SubscriptionFind',
      useFactory: (repository: TypeOrmSubscriptionRepository) =>
        new SubscriptionFind(repository),
      inject: ['SubscriptionRepository'],
    },
    {
      provide: 'SubscriptionCreate',
      useFactory: (
        repository: TypeOrmSubscriptionRepository,
        teamRepository: TypeOrmTeamRepository,
        planRepository: TypeOrmPlanRepository,
        userRepository: TypeOrmUserRepository,
        subFeatureRepository: TypeOrmSubscriptionFeatureRepository,
        featureRepository: TypeOrmFeatureRepository,
      ) =>
        new SubscriptionCreate(
          repository,
          teamRepository,
          planRepository,
          userRepository,
          subFeatureRepository,
          featureRepository,
        ),
      inject: [
        'SubscriptionRepository',
        'TeamRepository',
        'PlanRepository',
        'UserRepository',
        'SubscriptionFeatureRepository',
        'FeatureRepository',
      ],
    },
  ],
})
export class SubscriptionModule {}
