import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmSubscriptionEntity } from '../TypeOrm/TypeOrmSubscriptionEntity';
import { SubscriptionController } from './subscription.controller';
import { TypeOrmSubscriptionRepository } from '../TypeOrm/TypeOrmSubscriptionRepository';
import { SubscriptionCreate } from '../../application/SubscriptionCreate/SubscriptionCreate';
import { TypeOrmTeamEntity } from '@/lib/Team/infrastructure/TypeOrm/TypeOrmTeamEntity';
import { TypeOrmTeamRepository } from '@/lib/Team/infrastructure/TypeOrm/TypeOrmTeamRepository';
import { TypeOrmPlanRepository } from '@/lib/Plan/infrastructure/TypeOrm/TypeOrmPlanRepository';
import { TypeOrmPlanEntity } from '@/lib/Plan/infrastructure/TypeOrm/TypeOrmPlanEntity';
import { TypeOrmUserRepository } from '@/lib/User/infrastructure/TypeOrm/TypeOrmUserRepository';
import { TypeOrmUserEntity } from '@/lib/User/infrastructure/TypeOrm/TypeOrmUserEntity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeOrmSubscriptionEntity]),
    TypeOrmModule.forFeature([TypeOrmTeamEntity]),
    TypeOrmModule.forFeature([TypeOrmPlanEntity]),
    TypeOrmModule.forFeature([TypeOrmUserEntity]),
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
    // {
    //   provide: 'SubscriptionGetAll',
    //   useFactory: (repository: TypeOrmSubscriptionRepository) =>
    //     new SubscrptionGetAll(repository),
    //   inject: ['PlayerRepository'],
    // },
    {
      provide: 'SubscriptionCreate',
      useFactory: (
        repository: TypeOrmSubscriptionRepository,
        teamRepository: TypeOrmTeamRepository,
        planRepository: TypeOrmPlanRepository,
        userRepository: TypeOrmUserRepository,
      ) =>
        new SubscriptionCreate(
          repository,
          teamRepository,
          planRepository,
          userRepository,
        ),
      inject: [
        'SubscriptionRepository',
        'TeamRepository',
        'PlanRepository',
        'UserRepository',
      ],
    },
  ],
})
export class SubscriptionModule {}
