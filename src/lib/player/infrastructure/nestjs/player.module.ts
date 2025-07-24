import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlayerGetAll } from '../../../../lib/player/application/player-getall/player.getall';
import { PlayerCreate } from '../../application/player-create/player.create';
import { PlayerDelete } from '../../application/player-delete/player.delete';
import { PlayerUpdate } from '../../application/player-update/player.update';

import { PlayerController } from '../../../../lib/player/infrastructure/nestjs/player.controller';
import { TypeOrmPlayerEntity } from '../../../../lib/player/infrastructure/type-orm/type-orm-player.entity';
import { TypeOrmPlayerRepository } from '../../../../lib/player/infrastructure/type-orm/type-orm-player.repository';
import { TypeOrmTeamRepository } from '../../../../lib/team/infrastructure/TypeOrm/TypeOrmTeamRepository';
import { TypeOrmTeamEntity } from '../../../../lib/team/infrastructure/TypeOrm/TypeOrmTeamEntity';
import { TypeOrmSubscriptionEntity } from '../../../../lib/subscription/infrastructure/type-orm/type-orm-subscription.entity';
import { TypeOrmSubscriptionRepository } from '../../../../lib/subscription/infrastructure/type-orm/type-orm-subscription.repository';
import { TypeOrmFieldPositionEntity } from '../../../../lib/field-position/infrastructure/type-orm/type-orm-field-position.entity';
import { TypeOrmFieldPositionRepository } from '../../../../lib/field-position/infrastructure/type-orm/type-orm-field-position.repository';
import { TypeOrmPlanRepository } from '../../../../lib/plan/infrastructure/type-orm/type-orm-plan.repository';
import { TypeOrmPlanEntity } from '../../../../lib/plan/infrastructure/type-orm/type-orm-plan.entity';
import { TypeOrmUserEntity } from '../../../../lib/user/infrastructure/TypeOrm/TypeOrmUserEntity';
import { TypeOrmUserRepository } from '../../../../lib/user/infrastructure/TypeOrm/TypeOrmUserRepository';
import { TypeOrmPlayerPositionRepository } from '../../../../lib/player-position/infrastructure/type-orm/type-orm-player-position.repository';
import { TypeOrmPlayerPositionEntity } from '../../../../lib/player-position/infrastructure/type-orm/type-orm-player-position.entity';
import { TypeOrmMatchRepository } from '../../../../lib/match/infrastructure/type-orm/type-orm-match.repository';
import { TypeOrmMatchEntity } from '../../../../lib/match/infrastructure/type-orm/type-orm-match.entity';
import { TypeOrmMatchAparitionEntity } from '../../../../lib/match-aparition/infrastructure/type-orm/type-orm-match-aparition.entity';
import { UserCreate } from 'src/lib/user/application/UserCreate';
import { UserRepository } from 'src/lib/user/domain/UserRepository';
import { SubscriptionRepository } from 'src/lib/subscription/domain/subscription.repository';

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
      provide: 'UserCreate',
      useFactory: (
        userRepository: UserRepository,
        subscriptionRepository: SubscriptionRepository,
      ) => new UserCreate(userRepository, subscriptionRepository),
      inject: ['UserRepository', 'SubscriptionRepository'],
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
