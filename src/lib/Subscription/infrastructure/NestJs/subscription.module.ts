import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmSubscriptionEntity } from '../TypeOrm/TypeOrmSubscriptionEntity';
import { SubscriptionController } from './subscription.controller';
import { TypeOrmSubscriptionRepository } from '../TypeOrm/TypeOrmSubscriptionRepository';
import { SubscriptionCreate } from '../../application/SubscriptionCreate/SubscriptionCreate';
import { TypeOrmTeamEntity } from '@/lib/Team/infrastructure/TypeOrm/TypeOrmTeamEntity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeOrmSubscriptionEntity]),
    TypeOrmModule.forFeature([TypeOrmTeamEntity]),
  ],
  controllers: [SubscriptionController],
  providers: [
    {
      provide: 'SubscriptionRepository',
      useClass: TypeOrmSubscriptionRepository,
    },
    // {
    //   provide: 'SubscriptionGetAll',
    //   useFactory: (repository: TypeOrmSubscriptionRepository) =>
    //     new SubscrptionGetAll(repository),
    //   inject: ['PlayerRepository'],
    // },
    {
      provide: 'SubscriptionCreate',
      useFactory: (repository: TypeOrmSubscriptionRepository) =>
        new SubscriptionCreate(repository),
      inject: ['SubscriptionRepository'],
    },
  ],
})
export class SubscriptionModule {}
