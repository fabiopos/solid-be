import { Module } from '@nestjs/common';
import { PlayerInjuryController } from './player-injury.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmPlayerInjuryEntity } from '../type-orm/type-orm-player-injury.entity';
import { TypeOrmPlayerInjuryRepository } from '../type-orm/type-orm-player-injury.repository';
import { PlayerInjuryGet } from '../../application/PlayerInjuryGet/player-injury.get';
import { PlayerInjuryCreate } from '../../application/player-injury-create/player-injury.create';
import { PlayerInjuryUpdate } from '../../application/PlayerInjuryUpdate/player-injury.update';
import { PlayerInjuryDelete } from '../../application/player-injury-delete/player-injury.delete';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmPlayerInjuryEntity])],
  controllers: [PlayerInjuryController],
  providers: [
    {
      provide: 'PlayerInjuryRepository',
      useClass: TypeOrmPlayerInjuryRepository,
    },
    {
      provide: 'PlayerInjuryGet',
      useFactory: (repository: TypeOrmPlayerInjuryRepository) =>
        new PlayerInjuryGet(repository),
      inject: ['PlayerInjuryRepository'],
    },
    {
      provide: 'PlayerInjuryCreate',
      useFactory: (repository: TypeOrmPlayerInjuryRepository) =>
        new PlayerInjuryCreate(repository),
      inject: ['PlayerInjuryRepository'],
    },
    {
      provide: 'PlayerInjuryUpdate',
      useFactory: (repository: TypeOrmPlayerInjuryRepository) =>
        new PlayerInjuryUpdate(repository),
      inject: ['PlayerInjuryRepository'],
    },
    {
      provide: 'PlayerInjuryDelete',
      useFactory: (repository: TypeOrmPlayerInjuryRepository) =>
        new PlayerInjuryDelete(repository),
      inject: ['PlayerInjuryRepository'],
    },
  ],
})
export class PlayerInjuryModule {}
