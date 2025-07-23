import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthLogin } from '../../application/login/auth-login';
import { JWT_OPTIONS } from '../../../../utils/constants';
import { UserModule } from '../../../../lib/user/infrastructure/NestJs/user.module';
import { UserFindBy } from '../../../../lib/user/application/UserFindBy';
import { TypeOrmUserRepository } from '../../../../lib/user/infrastructure/TypeOrm/TypeOrmUserRepository';
import { TypeOrmSubscriptionEntity } from '../../../../lib/subscription/infrastructure/type-orm/type-orm-subscription.entity';
import { TypeOrmTeamEntity } from '../../../../lib/team/infrastructure/TypeOrm/TypeOrmTeamEntity';
import { TypeOrmPlanEntity } from '../../../../lib/plan/infrastructure/type-orm/type-orm-plan.entity';
import { TypeOrmUserEntity } from '../../../../lib/user/infrastructure/TypeOrm/TypeOrmUserEntity';
import { TypeOrmPlayerEntity } from '../../../../lib/player/infrastructure/type-orm/type-orm-player.entity';
import { TypeOrmSubscriptionFeatureEntity } from '../../../../lib/subscription-feature/infrastructure/type-orm/type-orm-subscription-feature.entity';
import { TypeOrmFeatureEntity } from '../../../../lib/feature/infrastructure/type-orm/type-orm-feature.entity';
import { TypeOrmSubscriptionRepository } from '../../../../lib/subscription/infrastructure/type-orm/type-orm-subscription.repository';
import { TypeOrmTeamRepository } from '../../../../lib/team/infrastructure/TypeOrm/TypeOrmTeamRepository';
import { TypeOrmPlanRepository } from '../../../../lib/plan/infrastructure/type-orm/type-orm-plan.repository';
import { TypeOrmPlayerRepository } from '../../../../lib/player/infrastructure/type-orm/type-orm-player.repository';
import { TypeOrmSubscriptionFeatureRepository } from '../../../../lib/subscription-feature/infrastructure/type-orm/type-orm-subscription-feature.repository';
import { TypeOrmFeatureRepository } from '../../../../lib/feature/infrastructure/type-orm/type-orm-feature.repository';
import { TypeOrmTwoFactorEntity } from '../type-orm/twofactor.entity';
import { TypeOrmTwoFactorRepository } from '../type-orm/twofactor.repository';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([TypeOrmSubscriptionEntity]),
    TypeOrmModule.forFeature([TypeOrmTeamEntity]),
    TypeOrmModule.forFeature([TypeOrmPlanEntity]),
    TypeOrmModule.forFeature([TypeOrmUserEntity]),
    TypeOrmModule.forFeature([TypeOrmPlayerEntity]),
    TypeOrmModule.forFeature([TypeOrmSubscriptionFeatureEntity]),
    TypeOrmModule.forFeature([TypeOrmFeatureEntity]),
    TypeOrmModule.forFeature([TypeOrmTwoFactorEntity]),
  ],
  providers: [
    {
      provide: 'SubscriptionRepository',
      useClass: TypeOrmSubscriptionRepository,
    },
    {
      provide: 'TeamRepository',
      useClass: TypeOrmTeamRepository,
    },
    {
      provide: 'PlanRepository',
      useClass: TypeOrmPlanRepository,
    },
    {
      provide: 'UserRepository',
      useClass: TypeOrmUserRepository,
    },
    {
      provide: 'PlayerRepository',
      useClass: TypeOrmPlayerRepository,
    },
    {
      provide: 'SubscriptionFeatureRepository',
      useClass: TypeOrmSubscriptionFeatureRepository,
    },
    {
      provide: 'FeatureRepository',
      useClass: TypeOrmFeatureRepository,
    },
    {
      provide: 'TwoFactorRepository',
      useClass: TypeOrmTwoFactorRepository,
    },
    {
      provide: 'UserFindBy',
      useFactory: (userRepository: TypeOrmUserRepository) =>
        new UserFindBy(userRepository),
      inject: ['UserRepository'],
    },
    {
      provide: 'AuthLogin',
      useFactory: (
        userService: UserFindBy,
        playerRepository: TypeOrmPlayerRepository,
        twoFactorRepository: TypeOrmTwoFactorRepository,
        teamRepository: TypeOrmTeamRepository,
      ) =>
        new AuthLogin(
          userService,
          new JwtService(JWT_OPTIONS),
          playerRepository,
          twoFactorRepository,
          teamRepository,
        ),
      inject: [
        'UserFindBy',
        'PlayerRepository',
        'TwoFactorRepository',
        'TeamRepository',
      ],
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
