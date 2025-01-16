import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmUserRepository } from '@/lib/user/infrastructure/TypeOrm/TypeOrmUserRepository';
import { TypeOrmUserEntity } from '@/lib/user/infrastructure/TypeOrm/TypeOrmUserEntity';
import { UserController } from './user.controller';
import { UserValidate } from '../../application/UserValidate';
import { TypeOrmSubscriptionRepository } from '@/lib/subscription/infrastructure/type-orm/type-orm-subscription.repository';
import { TypeOrmSubscriptionEntity } from '@/lib/subscription/infrastructure/type-orm/type-orm-subscription.entity';
import { TypeOrmTeamRepository } from '@/lib/team/infrastructure/TypeOrm/TypeOrmTeamRepository';
import { TypeOrmTeamEntity } from '@/lib/team/infrastructure/TypeOrm/TypeOrmTeamEntity';
import { TypeOrmPlanEntity } from '@/lib/plan/infrastructure/type-orm/type-orm-plan.entity';
import { TypeOrmPlanRepository } from '@/lib/plan/infrastructure/type-orm/type-orm-plan.repository';
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
