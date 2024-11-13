import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmSeasonEntity } from '../TypeOrm/TypeOrmSeasonEntity';
import { SeasonController } from './season.controller';
import { TypeOrmSeasonRepository } from '../TypeOrm/TypeOrmSeasonRepository';
import { SeasonGet } from '../../application/SeasonGet';
import { SeasonCreate } from '../../application/SeasonCreate';
import { SeasonUpdate } from '../../application/SeasonUpdate';
import { TypeOrmTeamRepository } from '@/lib/Team/infrastructure/TypeOrm/TypeOrmTeamRepository';
import { TypeOrmTeamEntity } from '@/lib/Team/infrastructure/TypeOrm/TypeOrmTeamEntity';
import { TypeOrmSubscriptionEntity } from '@/lib/Subscription/infrastructure/TypeOrm/TypeOrmSubscriptionEntity';

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
  ],
})
export class SeasonModule {}
