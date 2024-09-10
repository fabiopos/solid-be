import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmTeamEntity } from '../TypeOrm/TypeOrmTeamEntity';
import { TeamController } from './team.controller';
import { TypeOrmTeamRepository } from '../TypeOrm/TypeOrmTeamRepository';
import { TeamGetAll } from '../../application/TeamGetAll/TeamGetAll';
import { TeamCreate } from '../../application/TeamCreate/TeamCreate';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmTeamEntity])],
  controllers: [TeamController],
  providers: [
    {
      provide: 'TeamRepository',
      useClass: TypeOrmTeamRepository,
    },
    {
      provide: 'TeamGetAll',
      useFactory: (repository: TypeOrmTeamRepository) =>
        new TeamGetAll(repository),
      inject: ['TeamRepository'],
    },
    {
      provide: 'TeamCreate',
      useFactory: (repository: TypeOrmTeamRepository) =>
        new TeamCreate(repository),
      inject: ['TeamRepository'],
    },
  ],
})
export class TeamModule {}
