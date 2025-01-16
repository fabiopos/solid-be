import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmSubscriptionEntity } from '../TypeOrm/TypeOrmSubscriptionEntity';
import { SubscriptionController } from './subscription.controller';
import { TypeOrmSubscriptionRepository } from '../TypeOrm/TypeOrmSubscriptionRepository';
import { SubscriptionCreate } from '../../application/SubscriptionCreate/SubscriptionCreate';
import { TypeOrmTeamEntity } from '@/lib/Team/infrastructure/TypeOrm/TypeOrmTeamEntity';
import { TypeOrmTeamRepository } from '@/lib/Team/infrastructure/TypeOrm/TypeOrmTeamRepository';
import { TypeOrmPlanRepository } from '@/lib/plan/infrastructure/TypeOrm/TypeOrmPlanRepository';
import { TypeOrmPlanEntity } from '@/lib/plan/infrastructure/TypeOrm/TypeOrmPlanEntity';
import { TypeOrmUserRepository } from '@/lib/User/infrastructure/TypeOrm/TypeOrmUserRepository';
import { TypeOrmUserEntity } from '@/lib/User/infrastructure/TypeOrm/TypeOrmUserEntity';
import { SubscriptionGetAll } from '../../application/SubscriptionGetAll/SubscriptionGetAll';
import { TypeOrmPlayerRepository } from '@/lib/player/infrastructure/TypeOrm/TypeOrmPlayerRepository';
import { TypeOrmPlayerEntity } from '@/lib/player/infrastructure/TypeOrm/TypeOrmPlayerEntity';
import { SubscriptionFind } from '../../application/SubscriptionFind/SubscriptionFind';
import { TypeOrmSubscriptionFeatureRepository } from '@/lib/SubscriptionFeature/infrastructure/TypeOrm/TypeOrmSubscriptionFeatureRepository';
import { TypeOrmSubscriptionFeatureEntity } from '@/lib/SubscriptionFeature/infrastructure/TypeOrm/TypeOrmSubscriptionFeatureEntity';
import { TypeOrmFeatureRepository } from '@/lib/feature/infrastructure/type-orm/type-orm-feature.repository';
import { TypeOrmFeatureEntity } from '@/lib/feature/infrastructure/type-orm/type-orm-feature.entity';
import { JwtModule } from '@nestjs/jwt';
import { JWT_OPTIONS } from '@/utils/constants';

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
