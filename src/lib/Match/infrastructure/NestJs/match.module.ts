import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmMatchEntity } from '../TypeOrm/TypeOrmMatchEntity';
import { TypeOrmTeamEntity } from '@/lib/Team/infrastructure/TypeOrm/TypeOrmTeamEntity';
import { MatchController } from './match.controller';
import { TypeOrmMatchRepository } from '../TypeOrm/TypeOrmMatchRepository';
import { TypeOrmTeamRepository } from '@/lib/Team/infrastructure/TypeOrm/TypeOrmTeamRepository';
import { MatchGet } from '../../application/MatchGet';
import { MatchUpdate } from '../../application/MatchUpdate';
import { MatchDelete } from '../../application/MatchDelete';
import { MatchCreate } from '../../application/MatchCreate';
import { TypeOrmSeasonRepository } from '@/lib/Season/infrastructure/TypeOrm/TypeOrmSeasonRepository';
import { TypeOrmSeasonEntity } from '@/lib/Season/infrastructure/TypeOrm/TypeOrmSeasonEntity';
import { TypeOrmSubscriptionEntity } from '@/lib/Subscription/infrastructure/TypeOrm/TypeOrmSubscriptionEntity';
import { TypeOrmSubscriptionRepository } from '@/lib/Subscription/infrastructure/TypeOrm/TypeOrmSubscriptionRepository';
import { TypeOrmPlanEntity } from '@/lib/Plan/infrastructure/TypeOrm/TypeOrmPlanEntity';
import { TypeOrmUserEntity } from '@/lib/User/infrastructure/TypeOrm/TypeOrmUserEntity';
import { TypeOrmPlayerEntity } from '@/lib/player/infrastructure/TypeOrm/TypeOrmPlayerEntity';
import { TypeOrmSubscriptionFeatureEntity } from '@/lib/SubscriptionFeature/infrastructure/TypeOrm/TypeOrmSubscriptionFeatureEntity';
import { TypeOrmFeatureEntity } from '@/lib/Feature/infrastructure/TypeOrm/TypeOrmFeatureEntity';
import { TypeOrmMatchAparitionEntity } from '@/lib/MatchAparition/infrastructure/TypeOrm/TypeOrmMatchAparitionEntity';
import { TypeOrmMatchAparitionRepository } from '@/lib/MatchAparition/infrastructure/TypeOrm/TypeOrmMatchAparitionRepository';

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
