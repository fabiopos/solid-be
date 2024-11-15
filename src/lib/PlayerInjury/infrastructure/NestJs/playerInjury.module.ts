import { Module } from '@nestjs/common';
import { PlayerInjuryController } from './playerInjury.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmPlayerInjuryEntity } from '../TypeOrm/TypeOrmPlayerInjuryEntity';
import { TypeOrmPlayerInjuryRepository } from '../TypeOrm/TypeOrmPlayerInjuryRepository';
import { PlayerInjuryGet } from '../../application/PlayerInjuryGet/PlayerInjuryGet';
import { PlayerInjuryCreate } from '../../application/PlayerInjuryCreate/PlayerInjuryCreate';
import { PlayerInjuryUpdate } from '../../application/PlayerInjuryUpdate/PlayerInjuryUpdate';
import { PlayerInjuryDelete } from '../../application/PlayerInjuryDelete/PlayerInjuryDelete';

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
