import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlayerGetAll } from '@/lib/player/application/PlayerGetAll/PlayerGetAll';
import { PlayerController } from '@/lib/player/infrastructure/NestJs/player.controller';
import { TypeOrmPlayerEntity } from '@/lib/player/infrastructure/TypeOrm/TypeOrmPlayerEntity';
import { TypeOrmPlayerRepository } from '@/lib/player/infrastructure/TypeOrm/TypeOrmPlayerRepository';
import { PlayerCreate } from '../../application/PlayerCreate/PlayerCreate';
import { TypeOrmTeamRepository } from '@/lib/Team/infrastructure/TypeOrm/TypeOrmTeamRepository';
import { TypeOrmTeamEntity } from '@/lib/Team/infrastructure/TypeOrm/TypeOrmTeamEntity';
import { TypeOrmSubscriptionEntity } from '@/lib/Subscription/infrastructure/TypeOrm/TypeOrmSubscriptionEntity';
import { TypeOrmSubscriptionRepository } from '@/lib/Subscription/infrastructure/TypeOrm/TypeOrmSubscriptionRepository';
import { TypeOrmFieldPositionEntity } from '@/lib/FieldPosition/infrastructure/TypeOrm/TypeOrmFieldPositionEntity';
import { TypeOrmFieldPositionRepository } from '@/lib/FieldPosition/infrastructure/TypeOrm/TypeOrmFieldPositionRepository';
import { TypeOrmPlanRepository } from '@/lib/Plan/infrastructure/TypeOrm/TypeOrmPlanRepository';
import { TypeOrmPlanEntity } from '@/lib/Plan/infrastructure/TypeOrm/TypeOrmPlanEntity';
import { TypeOrmUserEntity } from '@/lib/User/infrastructure/TypeOrm/TypeOrmUserEntity';
import { TypeOrmUserRepository } from '@/lib/User/infrastructure/TypeOrm/TypeOrmUserRepository';
import { TypeOrmPlayerPositionRepository } from '@/lib/PlayerPosition/infrastructure/TypeOrm/TypeOrmPlayerPositionRepository';
import { TypeOrmPlayerPositionEntity } from '@/lib/PlayerPosition/infrastructure/TypeOrm/TypeOrmPlayerPositionEntity';
import { PlayerDelete } from '../../application/PlayerDelete/PlayerDelete';
import { PlayerUpdate } from '../../application/PlayerUpdate/PlayerUpdate';
import { TypeOrmMatchRepository } from '@/lib/Match/infrastructure/TypeOrm/TypeOrmMatchRepository';
import { TypeOrmMatchEntity } from '@/lib/Match/infrastructure/TypeOrm/TypeOrmMatchEntity';
import { TypeOrmMatchAparitionEntity } from '@/lib/MatchAparition/infrastructure/TypeOrm/TypeOrmMatchAparitionEntity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeOrmPlayerEntity]),
    TypeOrmModule.forFeature([TypeOrmTeamEntity]),
    TypeOrmModule.forFeature([TypeOrmSubscriptionEntity]),
    TypeOrmModule.forFeature([TypeOrmFieldPositionEntity]),
    TypeOrmModule.forFeature([TypeOrmPlanEntity]),
    TypeOrmModule.forFeature([TypeOrmUserEntity]),
    TypeOrmModule.forFeature([TypeOrmPlayerPositionEntity]),
    TypeOrmModule.forFeature([TypeOrmMatchEntity]),
    TypeOrmModule.forFeature([TypeOrmMatchAparitionEntity]),
  ],
  controllers: [PlayerController],
  providers: [
    {
      provide: 'PlayerRepository',
      useClass: TypeOrmPlayerRepository,
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
      provide: 'FieldPositionRepository',
      useClass: TypeOrmFieldPositionRepository,
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
      provide: 'PlayerPositionRepository',
      useClass: TypeOrmPlayerPositionRepository,
    },
    {
      provide: 'MatchRepository',
      useClass: TypeOrmMatchRepository,
    },
    {
      provide: 'PlayerGetAll',
      useFactory: (
        repository: TypeOrmPlayerRepository,
        matchRepo: TypeOrmMatchRepository,
      ) => new PlayerGetAll(repository, matchRepo),
      inject: ['PlayerRepository', 'MatchRepository'],
    },
    {
      provide: 'PlayerCreate',
      useFactory: (
        repository: TypeOrmPlayerRepository,
        teamRepository: TypeOrmTeamRepository,
        subscriptionRepository: TypeOrmSubscriptionRepository,
        fieldPositionRepository: TypeOrmFieldPositionRepository,
        playerPositionRepository: TypeOrmPlayerPositionRepository,
      ) =>
        new PlayerCreate(
          repository,
          teamRepository,
          subscriptionRepository,
          fieldPositionRepository,
          playerPositionRepository,
        ),
      inject: [
        'PlayerRepository',
        'TeamRepository',
        'SubscriptionRepository',
        'FieldPositionRepository',
        'PlayerPositionRepository',
      ],
    },
    {
      provide: 'PlayerDelete',
      useFactory: (
        repository: TypeOrmPlayerRepository,
        playerPositionRepository: TypeOrmPlayerPositionRepository,
      ) => new PlayerDelete(repository, playerPositionRepository),
      inject: ['PlayerRepository', 'PlayerPositionRepository'],
    },
    {
      provide: 'PlayerUpdate',
      useFactory: (
        repository: TypeOrmPlayerRepository,
        teamRepository: TypeOrmTeamRepository,
        subscriptionRepository: TypeOrmSubscriptionRepository,
        fieldPositionRepository: TypeOrmFieldPositionRepository,
        playerPositionRepository: TypeOrmPlayerPositionRepository,
      ) =>
        new PlayerUpdate(
          repository,
          teamRepository,
          subscriptionRepository,
          fieldPositionRepository,
          playerPositionRepository,
        ),
      inject: [
        'PlayerRepository',
        'TeamRepository',
        'SubscriptionRepository',
        'FieldPositionRepository',
        'PlayerPositionRepository',
      ],
    },
  ],
})
export class PlayerModule {}
