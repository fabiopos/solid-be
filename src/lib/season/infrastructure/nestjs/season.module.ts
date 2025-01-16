import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmSeasonEntity } from '../type-orm/type-orm-season.entity';
import { SeasonController } from './season.controller';
import { TypeOrmSeasonRepository } from '../type-orm/type-orm-season.repository';
import { SeasonGet } from '../../application/season.get';
import { SeasonCreate } from '../../application/season.create';
import { SeasonUpdate } from '../../application/season.update';
import { TypeOrmTeamRepository } from '@/lib/team/infrastructure/TypeOrm/TypeOrmTeamRepository';
import { TypeOrmTeamEntity } from '@/lib/team/infrastructure/TypeOrm/TypeOrmTeamEntity';
import { TypeOrmSubscriptionEntity } from '@/lib/subscription/infrastructure/type-orm/type-orm-subscription.entity';
import { SeasonDelete } from '../../application/season.delete';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeOrmSeasonEntity]),
    TypeOrmModule.forFeature([TypeOrmTeamEntity]),
    TypeOrmModule.forFeature([TypeOrmSubscriptionEntity]),
  ],
  controllers: [SeasonController],
  providers: [
    {
      provide: 'SeasonRepository',
      useClass: TypeOrmSeasonRepository,
    },
    {
      provide: 'TeamRepository',
      useClass: TypeOrmTeamRepository,
    },

    {
      provide: 'SeasonGet',
      useFactory: (repository: TypeOrmSeasonRepository) =>
        new SeasonGet(repository),
      inject: ['SeasonRepository'],
    },
    {
      provide: 'SeasonCreate',
      useFactory: (repository: TypeOrmSeasonRepository) =>
        new SeasonCreate(repository),
      inject: ['SeasonRepository'],
    },
    {
      provide: 'SeasonUpdate',
      useFactory: (repository: TypeOrmSeasonRepository) =>
        new SeasonUpdate(repository),
      inject: ['SeasonRepository'],
    },
    {
      provide: 'SeasonDelete',
      useFactory: (repository: TypeOrmSeasonRepository) =>
        new SeasonDelete(repository),
      inject: ['SeasonRepository'],
    },
  ],
})
export class SeasonModule {}
