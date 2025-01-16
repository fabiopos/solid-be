import { TypeOrmCompetitionEntity } from '@/lib/competition/infrastructure/type-orm/type-orm-competition.entity';
import { TypeOrmMatchEntity } from '@/lib/match/infrastructure/type-orm/type-orm-match.entity';
import { TypeOrmSeasonEntity } from '@/lib/Season/infrastructure/TypeOrm/TypeOrmSeasonEntity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardGet } from '../../application/gashboard-get/dashboard.get';
import { TypeOrmSeasonRepository } from '@/lib/Season/infrastructure/TypeOrm/TypeOrmSeasonRepository';
import { TypeOrmCompetitionRepository } from '@/lib/competition/infrastructure/type-orm/type-orm-competition.repository';
import { TypeOrmMatchRepository } from '@/lib/match/infrastructure/type-orm/type-orm-match.repository';
import { TypeOrmTeamEntity } from '@/lib/Team/infrastructure/TypeOrm/TypeOrmTeamEntity';
import { TypeOrmPlayerRepository } from '@/lib/player/infrastructure/TypeOrm/TypeOrmPlayerRepository';
import { TypeOrmPlayerEntity } from '@/lib/player/infrastructure/TypeOrm/TypeOrmPlayerEntity';
import { TypeOrmMatchAparitionEntity } from '@/lib/match-aparition/infrastructure/type-orm/type-orm-match-aparition.entity';
import { TypeOrmMatchAparitionRepository } from '@/lib/match-aparition/infrastructure/type-orm/type-orm-match-aparition.repository';

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
