import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthLogin } from '../../application/Login/AuthLogin';
import { JwtService } from '@nestjs/jwt';
import { JWT_OPTIONS } from '@/utils/constants';
import { UserModule } from '@/lib/User/infrastructure/NestJs/user.module';
import { UserFindBy } from '@/lib/User/application/UserFindBy';
import { TypeOrmUserRepository } from '@/lib/User/infrastructure/TypeOrm/TypeOrmUserRepository';
import { TypeOrmSubscriptionEntity } from '@/lib/Subscription/infrastructure/TypeOrm/TypeOrmSubscriptionEntity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmTeamEntity } from '@/lib/Team/infrastructure/TypeOrm/TypeOrmTeamEntity';
import { TypeOrmPlanEntity } from '@/lib/Plan/infrastructure/TypeOrm/TypeOrmPlanEntity';
import { TypeOrmUserEntity } from '@/lib/User/infrastructure/TypeOrm/TypeOrmUserEntity';
import { TypeOrmPlayerEntity } from '@/lib/Player/infrastructure/TypeOrm/TypeOrmPlayerEntity';
import { TypeOrmSubscriptionFeatureEntity } from '@/lib/SubscriptionFeature/infrastructure/TypeOrm/TypeOrmSubscriptionFeatureEntity';
import { TypeOrmFeatureEntity } from '@/lib/Feature/infrastructure/TypeOrm/TypeOrmFeatureEntity';
import { TypeOrmSubscriptionRepository } from '@/lib/Subscription/infrastructure/TypeOrm/TypeOrmSubscriptionRepository';
import { TypeOrmTeamRepository } from '@/lib/Team/infrastructure/TypeOrm/TypeOrmTeamRepository';
import { TypeOrmPlanRepository } from '@/lib/Plan/infrastructure/TypeOrm/TypeOrmPlanRepository';
import { TypeOrmPlayerRepository } from '@/lib/Player/infrastructure/TypeOrm/TypeOrmPlayerRepository';
import { TypeOrmSubscriptionFeatureRepository } from '@/lib/SubscriptionFeature/infrastructure/TypeOrm/TypeOrmSubscriptionFeatureRepository';
import { TypeOrmFeatureRepository } from '@/lib/Feature/infrastructure/TypeOrm/TypeOrmFeatureRepository';

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
      provide: 'UserFindBy',
      useFactory: (userRepository: TypeOrmUserRepository) =>
        new UserFindBy(userRepository),
      inject: ['UserRepository'],
    },
    {
      provide: 'AuthLogin',
      useFactory: (userService: UserFindBy) =>
        new AuthLogin(userService, new JwtService(JWT_OPTIONS)),
      inject: ['UserFindBy'],
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
