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

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeOrmSeasonEntity]),
    TypeOrmModule.forFeature([TypeOrmCompetitionEntity]),
    TypeOrmModule.forFeature([TypeOrmMatchEntity]),
    TypeOrmModule.forFeature([TypeOrmTeamEntity]),
    TypeOrmModule.forFeature([TypeOrmPlayerEntity]),
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
      provide: 'DashboardGet',
      useFactory: (
        sr: TypeOrmSeasonRepository,
        cr: TypeOrmCompetitionRepository,
        mr: TypeOrmMatchRepository,
        pr: TypeOrmPlayerRepository,
      ) => new DashboardGet(sr, cr, mr, pr),
      inject: [
        'SeasonRepository',
        'CompetitionRepository',
        'MatchRepository',
        'PlayerRepository',
      ],
    },
  ],
})
export class DashboardModule {}
