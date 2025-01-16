import { PlayerModule } from '@/lib/player/infrastructure/NestJs/player.module';
import { TeamModule } from '@/lib/Team/infrastructure/NestJs/team.module';
import { SubscriptionModule } from '@/lib/Subscription/infrastructure/NestJs/subscription.module';
import { UserModule } from '@/lib/User/infrastructure/NestJs/user.module';
import { AuthModule } from '@/lib/auth/infraestructure/nestjs/auth.module';
import { FieldPositionModule } from '@/lib/field-position/infrastructure/nestjs/fieldPosition.module';
import { SeasonModule } from '@/lib/Season/infrastructure/NestJs/season.module';
import { CompetitionModule } from '@/lib/competition/infrastructure/nestjs/competition.module';
import { MatchModule } from '@/lib/match/infrastructure/nestjs/match.module';
import { SettingsModule } from '@/lib/Settings/infraestructure/NestJs/settings.module';
import { MatchAparitionModule } from '@/lib/match-aparition/infrastructure/nestjs/match-aparition.module';
import { PlayerInjuryModule } from '@/lib/PlayerInjury/infrastructure/NestJs/playerInjury.module';
import { PlayerPositionModule } from '@/lib/PlayerPosition/infrastructure/NestJs/playerPosition.module';
import { DashboardModule } from '@/lib/dashboard/infraestructure/nestjs/dashboard.module';

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
