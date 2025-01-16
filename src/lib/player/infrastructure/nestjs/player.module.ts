import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlayerGetAll } from '@/lib/player/application/player-getall/player.getall';
import { PlayerController } from '@/lib/player/infrastructure/nestjs/player.controller';
import { TypeOrmPlayerEntity } from '@/lib/player/infrastructure/type-orm/type-orm-player.entity';
import { TypeOrmPlayerRepository } from '@/lib/player/infrastructure/type-orm/type-orm-player.repository';
import { PlayerCreate } from '../../application/player-create/player.create';
import { TypeOrmTeamRepository } from '@/lib/Team/infrastructure/TypeOrm/TypeOrmTeamRepository';
import { TypeOrmTeamEntity } from '@/lib/Team/infrastructure/TypeOrm/TypeOrmTeamEntity';
import { TypeOrmSubscriptionEntity } from '@/lib/Subscription/infrastructure/TypeOrm/TypeOrmSubscriptionEntity';
import { TypeOrmSubscriptionRepository } from '@/lib/Subscription/infrastructure/TypeOrm/TypeOrmSubscriptionRepository';
import { TypeOrmFieldPositionEntity } from '@/lib/field-position/infrastructure/type-orm/type-orm-field-position.entity';
import { TypeOrmFieldPositionRepository } from '@/lib/field-position/infrastructure/type-orm/type-orm-field-position.repository';
import { TypeOrmPlanRepository } from '@/lib/plan/infrastructure/type-orm/type-orm-plan.repository';
import { TypeOrmPlanEntity } from '@/lib/plan/infrastructure/type-orm/type-orm-plan.entity';
import { TypeOrmUserEntity } from '@/lib/User/infrastructure/TypeOrm/TypeOrmUserEntity';
import { TypeOrmUserRepository } from '@/lib/User/infrastructure/TypeOrm/TypeOrmUserRepository';
import { TypeOrmPlayerPositionRepository } from '@/lib/player-position/infrastructure/type-orm/TypeOrmPlayerPositionRepository';
import { TypeOrmPlayerPositionEntity } from '@/lib/player-position/infrastructure/type-orm/TypeOrmPlayerPositionEntity';
import { PlayerDelete } from '../../application/player-delete/player.delete';
import { PlayerUpdate } from '../../application/player-update/player.update';
import { TypeOrmMatchRepository } from '@/lib/match/infrastructure/type-orm/type-orm-match.repository';
import { TypeOrmMatchEntity } from '@/lib/match/infrastructure/type-orm/type-orm-match.entity';
import { TypeOrmMatchAparitionEntity } from '@/lib/match-aparition/infrastructure/type-orm/type-orm-match-aparition.entity';

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
