import { Module } from '@nestjs/common';
import { MatchAparitionController } from './match-aparition.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmMatchAparitionEntity } from '../type-orm/type-orm-match-aparition.entity';
import { TypeOrmMatchAparitionRepository } from '../type-orm/type-orm-match-aparition.repository';
import { MatchAparitionGet } from '../../application/match-aparition-get/match-aparition.get';
import { MatchAparitionCreate } from '../../application/match-aparition-create/match-aparition.create';
import { MatchAparitionUpdate } from '../../application/match-aparition-update/match-aparition.update';
import { MatchAparitionDelete } from '../../application/match-aparition-delete/match-aparition.delete';

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
