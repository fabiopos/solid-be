import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmMatchEntity } from '../type-orm/type-orm-match.entity';
import { TypeOrmTeamEntity } from '@/lib/Team/infrastructure/TypeOrm/TypeOrmTeamEntity';
import { MatchController } from './match.controller';
import { TypeOrmMatchRepository } from '../type-orm/type-orm-match.repository';
import { TypeOrmTeamRepository } from '@/lib/Team/infrastructure/TypeOrm/TypeOrmTeamRepository';
import { MatchGet } from '../../application/match.get';
import { MatchUpdate } from '../../application/match.update';
import { MatchDelete } from '../../application/match.delete';
import { MatchCreate } from '../../application/match.create';
import { TypeOrmSeasonRepository } from '@/lib/Season/infrastructure/TypeOrm/TypeOrmSeasonRepository';
import { TypeOrmSeasonEntity } from '@/lib/Season/infrastructure/TypeOrm/TypeOrmSeasonEntity';
import { TypeOrmSubscriptionEntity } from '@/lib/Subscription/infrastructure/TypeOrm/TypeOrmSubscriptionEntity';
import { TypeOrmSubscriptionRepository } from '@/lib/Subscription/infrastructure/TypeOrm/TypeOrmSubscriptionRepository';
import { TypeOrmPlanEntity } from '@/lib/plan/infrastructure/type-orm/type-orm-plan.entity';
import { TypeOrmUserEntity } from '@/lib/User/infrastructure/TypeOrm/TypeOrmUserEntity';
import { TypeOrmPlayerEntity } from '@/lib/player/infrastructure/TypeOrm/TypeOrmPlayerEntity';
import { TypeOrmSubscriptionFeatureEntity } from '@/lib/SubscriptionFeature/infrastructure/TypeOrm/TypeOrmSubscriptionFeatureEntity';
import { TypeOrmFeatureEntity } from '@/lib/feature/infrastructure/type-orm/type-orm-feature.entity';
import { TypeOrmMatchAparitionEntity } from '@/lib/match-aparition/infrastructure/type-orm/type-orm-match-aparition.entity';
import { TypeOrmMatchAparitionRepository } from '@/lib/match-aparition/infrastructure/type-orm/type-orm-match-aparition.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeOrmMatchEntity]),
    TypeOrmModule.forFeature([TypeOrmTeamEntity]),
    TypeOrmModule.forFeature([TypeOrmSeasonEntity]),
    TypeOrmModule.forFeature([TypeOrmSubscriptionEntity]),
    TypeOrmModule.forFeature([TypeOrmPlanEntity]),
    TypeOrmModule.forFeature([TypeOrmUserEntity]),
    TypeOrmModule.forFeature([TypeOrmPlayerEntity]),
    TypeOrmModule.forFeature([TypeOrmSubscriptionFeatureEntity]),
    TypeOrmModule.forFeature([TypeOrmFeatureEntity]),
    TypeOrmModule.forFeature([TypeOrmMatchAparitionEntity]),
  ],
  controllers: [MatchController],
  providers: [
    {
      provide: 'SeasonRepository',
      useClass: TypeOrmSeasonRepository,
    },
    {
      provide: 'MatchRepository',
      useClass: TypeOrmMatchRepository,
    },
    {
      provide: 'MatchAparitionRepository',
      useClass: TypeOrmMatchAparitionRepository,
    },
    {
      provide: 'TeamRepository',
      useClass: TypeOrmTeamRepository,
    },
    {
      provide: 'SubscriptionRepository',
      useClass: TypeOrmSubscriptionRepository,
    },
    {
      provide: 'MatchGet',
      useFactory: (repository: TypeOrmMatchRepository) =>
        new MatchGet(repository),
      inject: ['MatchRepository'],
    },
    {
      provide: 'MatchUpdate',
      useFactory: (repository: TypeOrmMatchRepository) =>
        new MatchUpdate(repository),
      inject: ['MatchRepository'],
    },
    {
      provide: 'MatchDelete',
      useFactory: (repository: TypeOrmMatchRepository) =>
        new MatchDelete(repository),
      inject: ['MatchRepository', 'MatchAparitionRepository'],
    },
    {
      provide: 'MatchCreate',
      useFactory: (repository: TypeOrmMatchRepository) =>
        new MatchCreate(repository),
      inject: ['MatchRepository'],
    },
  ],
})
export class MatchModule {}
