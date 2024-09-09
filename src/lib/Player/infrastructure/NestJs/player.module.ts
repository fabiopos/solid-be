import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlayerGetAll } from '@/lib/Player/application/PlayerGetAll/PlayerGetAll';
import { PlayerController } from '@/lib/Player/infrastructure/NestJs/player.controller';
import { TypeOrmPlayerEntity } from '@/lib/Player/infrastructure/TypeOrm/TypeOrmPlayerEntity';
import { TypeOrmPlayerRepository } from '@/lib/Player/infrastructure/TypeOrm/TypeOrmPlayerRepository';
import { PlayerCreate } from '../../application/PlayerCreate/PlayerCreate';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmPlayerEntity])],
  controllers: [PlayerController],
  providers: [
    {
      provide: 'PlayerRepository',
      useClass: TypeOrmPlayerRepository,
    },
    {
      provide: 'PlayerGetAll',
      useFactory: (repository: TypeOrmPlayerRepository) =>
        new PlayerGetAll(repository),
      inject: ['PlayerRepository'],
    },
    {
      provide: 'PlayerCreate',
      useFactory: (repository: TypeOrmPlayerRepository) =>
        new PlayerCreate(repository),
      inject: ['PlayerRepository'],
    },
  ],
})
export class PlayerModule {}
