import { Module } from '@nestjs/common';
import { PlayerPositionController } from './playerPosition.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmPlayerPositionEntity } from '../TypeOrm/TypeOrmPlayerPositionEntity';
import { PlayerPositionGet } from '../../application/PlayerPositionGet';
import { TypeOrmPlayerPositionRepository } from '../TypeOrm/TypeOrmPlayerPositionRepository';
import { PlayerPositionCreate } from '../../application/PlayerPositionCreate';
import { TypeOrmPlayerEntity } from '@/lib/player/infrastructure/TypeOrm/TypeOrmPlayerEntity';
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
