import { Module } from '@nestjs/common';
import { PlayerPositionController } from './player-position.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmPlayerPositionEntity } from '../type-orm/TypeOrmPlayerPositionEntity';
import { PlayerPositionGet } from '../../application/player-position.get';
import { TypeOrmPlayerPositionRepository } from '../type-orm/TypeOrmPlayerPositionRepository';
import { PlayerPositionCreate } from '../../application/player-position.create';
import { TypeOrmPlayerEntity } from '@/lib/player/infrastructure/type-orm/type-orm-player.entity';
import { TypeOrmFieldPositionEntity } from '@/lib/field-position/infrastructure/type-orm/type-orm-field-position.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeOrmPlayerPositionEntity]),
    TypeOrmModule.forFeature([TypeOrmPlayerEntity]),
    TypeOrmModule.forFeature([TypeOrmFieldPositionEntity]),
  ],
  controllers: [PlayerPositionController],
  providers: [
    {
      provide: 'PlayerPositionRepository',
      useClass: TypeOrmPlayerPositionRepository,
    },
    {
      provide: 'PlayerPositionGet',
      useFactory: (repository: TypeOrmPlayerPositionRepository) =>
        new PlayerPositionGet(repository),
      inject: ['PlayerPositionRepository'],
    },
    {
      provide: 'PlayerPositionCreate',
      useFactory: (repository: TypeOrmPlayerPositionRepository) =>
        new PlayerPositionCreate(repository),
      inject: ['PlayerPositionRepository'],
    },
  ],
})
export class PlayerPositionModule {}
