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

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeOrmSubscriptionEntity]),
    TypeOrmModule.forFeature([TypeOrmTeamEntity]),
    TypeOrmModule.forFeature([TypeOrmPlanEntity]),
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
      ) => new SubscriptionCreate(repository, teamRepository),
      inject: ['SubscriptionRepository', 'TeamRepository'],
    },
  ],
})
export class SubscriptionModule {}
