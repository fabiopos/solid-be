import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmCompetitionEntity } from '../type-orm/type-orm-competition.entity';
import { CompetitionController } from './competition.controller';
import { TypeOrmCompetitionRepository } from '../type-orm/type-orm-competition.repository';
import { TypeOrmSeasonRepository } from '@/lib/Season/infrastructure/TypeOrm/TypeOrmSeasonRepository';
import { CompetitionGet } from '../../application/competition.get';
import { CompetitionCreate } from '../../application/competition.create';
import { CompetitionUpdate } from '../../application/competition.update';
import { CompetitionDelete } from '../../application/competition.delete';
import { TypeOrmSeasonEntity } from '@/lib/Season/infrastructure/TypeOrm/TypeOrmSeasonEntity';
import { TypeOrmTeamEntity } from '@/lib/Team/infrastructure/TypeOrm/TypeOrmTeamEntity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeOrmCompetitionEntity]),
    TypeOrmModule.forFeature([TypeOrmSeasonEntity]),
    TypeOrmModule.forFeature([TypeOrmTeamEntity]),
  ],
  controllers: [CompetitionController],
  providers: [
    {
      provide: 'CompetitionRepository',
      useClass: TypeOrmCompetitionRepository,
    },
    {
      provide: 'SeasonRepository',
      useClass: TypeOrmSeasonRepository,
    },
    {
      provide: 'CompetitionGet',
      useFactory: (repository: TypeOrmCompetitionRepository) =>
        new CompetitionGet(repository),
      inject: ['CompetitionRepository'],
    },
    {
      provide: 'CompetitionCreate',
      useFactory: (repository: TypeOrmCompetitionRepository) =>
        new CompetitionCreate(repository),
      inject: ['CompetitionRepository'],
    },
    {
      provide: 'CompetitionUpdate',
      useFactory: (repository: TypeOrmCompetitionRepository) =>
        new CompetitionUpdate(repository),
      inject: ['CompetitionRepository'],
    },
    {
      provide: 'CompetitionDelete',
      useFactory: (repository: TypeOrmCompetitionRepository) =>
        new CompetitionDelete(repository),
      inject: ['CompetitionRepository'],
    },
  ],
})
export class CompetitionModule {}
