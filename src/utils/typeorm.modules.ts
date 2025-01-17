import { PlayerModule } from '../lib/player/infrastructure/nestjs/player.module';
import { TeamModule } from '../lib/team/infrastructure/NestJs/team.module';
import { SubscriptionModule } from '../lib/subscription/infrastructure/nestjs/subscription.module';
import { UserModule } from '../lib/user/infrastructure/NestJs/user.module';
import { AuthModule } from '../lib/auth/infraestructure/nestjs/auth.module';
import { FieldPositionModule } from '../lib/field-position/infrastructure/nestjs/fieldPosition.module';
import { SeasonModule } from '../lib/season/infrastructure/nestjs/season.module';
import { CompetitionModule } from '../lib/competition/infrastructure/nestjs/competition.module';
import { MatchModule } from '../lib/match/infrastructure/nestjs/match.module';
import { SettingsModule } from '../lib/settings/infraestructure/nestjs/settings.module';
import { MatchAparitionModule } from '../lib/match-aparition/infrastructure/nestjs/match-aparition.module';
import { PlayerInjuryModule } from '../lib/player-injury/infrastructure/nestjs/player-injury.module';
import { PlayerPositionModule } from '../lib/player-position/infrastructure/nestjs/player-position.module';
import { DashboardModule } from '../lib/dashboard/infraestructure/nestjs/dashboard.module';

export default [
  AuthModule,
  PlayerModule,
  PlayerInjuryModule,
  PlayerPositionModule,
  TeamModule,
  SeasonModule,
  CompetitionModule,
  SubscriptionModule,
  UserModule,
  MatchModule,
  MatchAparitionModule,
  SettingsModule,
  FieldPositionModule,
  DashboardModule,
];
