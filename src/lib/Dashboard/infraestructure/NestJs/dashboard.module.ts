import { TypeOrmCompetitionEntity } from '@/lib/Competition/infrastructure/TypeOrm/TypeOrmCompetitionEntity';
import { TypeOrmMatchEntity } from '@/lib/Match/infrastructure/TypeOrm/TypeOrmMatchEntity';
import { TypeOrmSeasonEntity } from '@/lib/Season/infrastructure/TypeOrm/TypeOrmSeasonEntity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardGet } from '../../application/DashboardGet/DashboardGet';
import { TypeOrmSeasonRepository } from '@/lib/Season/infrastructure/TypeOrm/TypeOrmSeasonRepository';
import { TypeOrmCompetitionRepository } from '@/lib/Competition/infrastructure/TypeOrm/TypeOrmCompetitionRepository';
import { TypeOrmMatchRepository } from '@/lib/Match/infrastructure/TypeOrm/TypeOrmMatchRepository';
import { TypeOrmTeamEntity } from '@/lib/Team/infrastructure/TypeOrm/TypeOrmTeamEntity';
import { TypeOrmPlayerRepository } from '@/lib/Player/infrastructure/TypeOrm/TypeOrmPlayerRepository';
import { TypeOrmPlayerEntity } from '@/lib/Player/infrastructure/TypeOrm/TypeOrmPlayerEntity';
import { TypeOrmMatchAparitionEntity } from '@/lib/MatchAparition/infrastructure/TypeOrm/TypeOrmMatchAparitionEntity';
import { TypeOrmMatchAparitionRepository } from '@/lib/MatchAparition/infrastructure/TypeOrm/TypeOrmMatchAparitionRepository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeOrmSeasonEntity]),
    TypeOrmModule.forFeature([TypeOrmCompetitionEntity]),
    TypeOrmModule.forFeature([TypeOrmMatchEntity]),
    TypeOrmModule.forFeature([TypeOrmTeamEntity]),
    TypeOrmModule.forFeature([TypeOrmPlayerEntity]),
    TypeOrmModule.forFeature([TypeOrmMatchAparitionEntity]),
  ],
  controllers: [DashboardController],
  providers: [
    {
      provide: 'SeasonRepository',
      useClass: TypeOrmSeasonRepository,
    },
    {
      provide: 'CompetitionRepository',
      useClass: TypeOrmCompetitionRepository,
    },
    {
      provide: 'MatchRepository',
      useClass: TypeOrmMatchRepository,
    },
    {
      provide: 'PlayerRepository',
      useClass: TypeOrmPlayerRepository,
    },
    {
      provide: 'AparitionsRepository',
      useClass: TypeOrmMatchAparitionRepository,
    },
    {
      provide: 'DashboardGet',
      useFactory: (
        sr: TypeOrmSeasonRepository,
        cr: TypeOrmCompetitionRepository,
        mr: TypeOrmMatchRepository,
        pr: TypeOrmPlayerRepository,
        ar: TypeOrmMatchAparitionRepository,
      ) => new DashboardGet(sr, cr, mr, pr, ar),
      inject: [
        'SeasonRepository',
        'CompetitionRepository',
        'MatchRepository',
        'PlayerRepository',
        'AparitionsRepository',
      ],
    },
  ],
})
export class DashboardModule {}
