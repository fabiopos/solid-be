import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmUserRepository } from '@/lib/User/infrastructure/TypeOrm/TypeOrmUserRepository';
import { TypeOrmUserEntity } from '@/lib/User/infrastructure/TypeOrm/TypeOrmUserEntity';
import { UserController } from './user.controller';
import { UserValidate } from '../../application/UserValidate';
import { TypeOrmSubscriptionRepository } from '@/lib/Subscription/infrastructure/TypeOrm/TypeOrmSubscriptionRepository';
import { TypeOrmSubscriptionEntity } from '@/lib/Subscription/infrastructure/TypeOrm/TypeOrmSubscriptionEntity';
import { TypeOrmTeamRepository } from '@/lib/Team/infrastructure/TypeOrm/TypeOrmTeamRepository';
import { TypeOrmTeamEntity } from '@/lib/Team/infrastructure/TypeOrm/TypeOrmTeamEntity';
import { TypeOrmPlanEntity } from '@/lib/Plan/infrastructure/TypeOrm/TypeOrmPlanEntity';
import { TypeOrmPlanRepository } from '@/lib/Plan/infrastructure/TypeOrm/TypeOrmPlanRepository';
import { UserCreate } from '../../application/UserCreate';
import { UserFindBy } from '../../application/UserFindBy';
import { UserUpdate } from '../../application/UserUpdate';
import { UserDelete } from '../../application/UserDelete';
import { UserGetAll } from '../../application/UserGetAll';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeOrmUserEntity]),
    TypeOrmModule.forFeature([TypeOrmSubscriptionEntity]),
    TypeOrmModule.forFeature([TypeOrmTeamEntity]),
    TypeOrmModule.forFeature([TypeOrmPlanEntity]),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: 'UserRepository',
      useClass: TypeOrmUserRepository,
    },
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
      provide: 'UserValidate',
      useFactory: (userRepository: TypeOrmUserRepository) =>
        new UserValidate(userRepository),
      inject: ['UserRepository'],
    },
    {
      provide: 'UserCreate',
      useFactory: (
        userRepository: TypeOrmUserRepository,
        subscriptionRepository: TypeOrmSubscriptionRepository,
      ) => new UserCreate(userRepository, subscriptionRepository),
      inject: ['UserRepository'],
    },
    {
      provide: 'UserUpdate',
      useFactory: (userRepository: TypeOrmUserRepository) =>
        new UserUpdate(userRepository),
      inject: ['UserRepository'],
    },
    {
      provide: 'UserDelete',
      useFactory: (userRepository: TypeOrmUserRepository) =>
        new UserDelete(userRepository),
      inject: ['UserRepository'],
    },
    {
      provide: 'UserGetAll',
      useFactory: (userRepository: TypeOrmUserRepository) =>
        new UserGetAll(userRepository),
      inject: ['UserRepository'],
    },
    {
      provide: 'UserFindBy',
      useFactory: (userRepository: TypeOrmUserRepository) =>
        new UserFindBy(userRepository),
    },
  ],
})
export class UserModule {}
