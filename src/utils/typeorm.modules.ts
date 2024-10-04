import { PlayerModule } from '@/lib/Player/infrastructure/NestJs/player.module';
import { TeamModule } from '@/lib/Team/infrastructure/NestJs/team.module';
import { SubscriptionModule } from '@/lib/Subscription/infrastructure/NestJs/subscription.module';
import { UserModule } from '@/lib/User/infrastructure/NestJs/user.module';
import { AuthModule } from '@/lib/Auth/infraestructure/NestJs/auth.module';
import { FieldPositionModule } from '@/lib/FieldPosition/infrastructure/NestJs/fieldPosition.module';

export default [
  PlayerModule,
  TeamModule,
  SubscriptionModule,
  UserModule,
  AuthModule,
  FieldPositionModule,
];
