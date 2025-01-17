import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmTeamEntity } from '../TypeOrm/TypeOrmTeamEntity';
import { TeamController } from './team.controller';
import { TypeOrmTeamRepository } from '../TypeOrm/TypeOrmTeamRepository';
import { TeamGetAll } from '../../application/TeamGetAll/TeamGetAll';
import { TeamCreate } from '../../application/TeamCreate/TeamCreate';
import { TypeOrmSubscriptionEntity } from '../../../../lib/subscription/infrastructure/type-orm/type-orm-subscription.entity';
import { TeamValidate } from '../../application/TeamValidate/TeamValidate';
import { TeamFind } from '../../application/TeamFind/TeamFind';
import { TeamUpdate } from '../../application/TeamUpdate/TeamUpdate';
import { TeamDelete } from '../../application/TeamDelete/TeamDelete';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeOrmTeamEntity]),
    TypeOrmModule.forFeature([TypeOrmSubscriptionEntity]),
  ],
  controllers: [TeamController],
  providers: [
    {
      provide: 'TeamRepository',
      useClass: TypeOrmTeamRepository,
    },
    {
      provide: 'SubscriptionRepository',
      useClass: TypeOrmSubscriptionEntity,
    },
    {
      provide: 'TeamGetAll',
      useFactory: (repository: TypeOrmTeamRepository) =>
        new TeamGetAll(repository),
      inject: ['TeamRepository'],
    },
    {
      provide: 'TeamFind',
      useFactory: (repository: TypeOrmTeamRepository) =>
        new TeamFind(repository),
      inject: ['TeamRepository'],
    },
    {
      provide: 'TeamCreate',
      useFactory: (repository: TypeOrmTeamRepository) =>
        new TeamCreate(repository),
      inject: ['TeamRepository'],
    },
    {
      provide: 'TeamUpdate',
      useFactory: (repository: TypeOrmTeamRepository) =>
        new TeamUpdate(repository),
      inject: ['TeamRepository'],
    },
    {
      provide: 'TeamDelete',
      useFactory: (repository: TypeOrmTeamRepository) =>
        new TeamDelete(repository),
      inject: ['TeamRepository'],
    },
    {
      provide: 'TeamValidate',
      useFactory: (repository: TypeOrmTeamRepository) =>
        new TeamValidate(repository),
      inject: ['TeamRepository'],
    },
  ],
})
export class TeamModule {}
