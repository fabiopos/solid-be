import { Module } from '@nestjs/common';
import { MatchAparitionController } from './matchAparition.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmMatchAparitionEntity } from '../TypeOrm/TypeOrmMatchAparitionEntity';
import { TypeOrmMatchAparitionRepository } from '../TypeOrm/TypeOrmMatchAparitionRepository';
import { MatchAparitionGet } from '../../application/MatchAparitionGet/MatchAparitionGet';
import { MatchAparitionCreate } from '../../application/MatchAparitionCreate/MatchAparitionCreate';
import { MatchAparitionUpdate } from '../../application/MatchAparitionUpdate/MatchAparitionUpdate';
import { MatchAparitionDelete } from '../../application/MatchAparitionDelete/MatchAparitionDelete';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmMatchAparitionEntity])],
  controllers: [MatchAparitionController],
  providers: [
    {
      provide: 'MatchAparitionRepository',
      useClass: TypeOrmMatchAparitionRepository,
    },
    {
      provide: 'MatchAparitionGet',
      useFactory: (repository: TypeOrmMatchAparitionRepository) =>
        new MatchAparitionGet(repository),
      inject: ['MatchAparitionRepository'],
    },
    {
      provide: 'MatchAparitionCreate',
      useFactory: (repository: TypeOrmMatchAparitionRepository) =>
        new MatchAparitionCreate(repository),
      inject: ['MatchAparitionRepository'],
    },
    {
      provide: 'MatchAparitionUpdate',
      useFactory: (repository: TypeOrmMatchAparitionRepository) =>
        new MatchAparitionUpdate(repository),
      inject: ['MatchAparitionRepository'],
    },
    {
      provide: 'MatchAparitionDelete',
      useFactory: (repository: TypeOrmMatchAparitionRepository) =>
        new MatchAparitionDelete(repository),
      inject: ['MatchAparitionRepository'],
    },
  ],
})
export class MatchAparitionModule {}
