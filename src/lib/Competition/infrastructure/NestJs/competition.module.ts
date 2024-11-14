import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmCompetitionEntity } from '../TypeOrm/TypeOrmCompetitionEntity';
import { CompetitionController } from './competition.controller';
import { TypeOrmCompetitionRepository } from '../TypeOrm/TypeOrmCompetitionRepository';
import { TypeOrmSeasonRepository } from '@/lib/Season/infrastructure/TypeOrm/TypeOrmSeasonRepository';
import { CompetitionGet } from '../../application/CompetitionGet';
import { CompetitionCreate } from '../../application/CompetitionCreate';
import { CompetitionUpdate } from '../../application/CompetitionUpdate';
import { CompetitionDelete } from '../../application/CompetitionDelete';
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
