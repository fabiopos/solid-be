import { PlayerModule } from '@/lib/Player/infrastructure/NestJs/player.module';
import { TeamModule } from '@/lib/Team/infrastructure/NestJs/team.module';
import { SubscriptionModule } from '@/lib/Subscription/infrastructure/NestJs/subscription.module';
import { UserModule } from '@/lib/User/infrastructure/NestJs/user.module';
import { AuthModule } from '@/lib/Auth/infraestructure/NestJs/auth.module';
import { FieldPositionModule } from '@/lib/FieldPosition/infrastructure/NestJs/fieldPosition.module';
import { SeasonModule } from '@/lib/Season/infrastructure/NestJs/season.module';
import { CompetitionModule } from '@/lib/Competition/infrastructure/NestJs/competition.module';
import { MatchModule } from '@/lib/Match/infrastructure/NestJs/match.module';
import { SettingsModule } from '@/lib/Settings/infraestructure/NestJs/settings.module';
import { MatchAparitionModule } from '@/lib/MatchAparition/infrastructure/NestJs/matchAparition.module';
import { PlayerInjuryModule } from '@/lib/PlayerInjury/infrastructure/NestJs/playerInjury.module';
import { PlayerPositionModule } from '@/lib/PlayerPosition/infrastructure/NestJs/playerPosition.module';

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
];
