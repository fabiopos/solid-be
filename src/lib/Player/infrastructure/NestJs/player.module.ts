import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlayerGetAll } from '@/lib/Player/application/PlayerGetAll/PlayerGetAll';
import { PlayerController } from '@/lib/Player/infrastructure/NestJs/player.controller';
import { TypeOrmPlayerEntity } from '@/lib/Player/infrastructure/TypeOrm/TypeOrmPlayerEntity';
import { TypeOrmPlayerRepository } from '@/lib/Player/infrastructure/TypeOrm/TypeOrmPlayerRepository';
import { PlayerCreate } from '../../application/PlayerCreate/PlayerCreate';
import { TypeOrmTeamRepository } from '@/lib/Team/infrastructure/TypeOrm/TypeOrmTeamRepository';
import { TypeOrmTeamEntity } from '@/lib/Team/infrastructure/TypeOrm/TypeOrmTeamEntity';
import { TypeOrmSubscriptionEntity } from '@/lib/Subscription/infrastructure/TypeOrm/TypeOrmSubscriptionEntity';
import { TypeOrmSubscriptionRepository } from '@/lib/Subscription/infrastructure/TypeOrm/TypeOrmSubscriptionRepository';
import { TypeOrmFieldPositionEntity } from '@/lib/FieldPosition/infrastructure/TypeOrm/TypeOrmFieldPositionEntity';
import { TypeOrmFieldPositionRepository } from '@/lib/FieldPosition/infrastructure/TypeOrm/TypeOrmFieldPositionRepository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeOrmPlayerEntity]),
    TypeOrmModule.forFeature([TypeOrmTeamEntity]),
    TypeOrmModule.forFeature([TypeOrmSubscriptionEntity]),
    TypeOrmModule.forFeature([TypeOrmFieldPositionEntity]),
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
      provide: 'PlayerGetAll',
      useFactory: (repository: TypeOrmPlayerRepository) =>
        new PlayerGetAll(repository),
      inject: ['PlayerRepository'],
    },
    {
      provide: 'PlayerCreate',
      useFactory: (
        repository: TypeOrmPlayerRepository,
        teamRepository: TypeOrmTeamRepository,
        subscriptionRepository: TypeOrmSubscriptionRepository,
        fieldPositionRepository: TypeOrmFieldPositionRepository,
      ) =>
        new PlayerCreate(
          repository,
          teamRepository,
          subscriptionRepository,
          fieldPositionRepository,
        ),
      inject: [
        'PlayerRepository',
        'TeamRepository',
        'SubscriptionRepository',
        'FieldPositionRepository',
      ],
    },
  ],
})
export class PlayerModule {}
