import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { TypeOrmCompetitionEntity } from '@/lib/Competition/infrastructure/TypeOrm/TypeOrmCompetitionEntity';
import { SeasonStatusEnum } from '@/shared/enums/seasonStatusEnum';
import { TypeOrmTeamEntity } from '@/lib/Team/infrastructure/TypeOrm/TypeOrmTeamEntity';

@Entity('season')
export class TypeOrmSeasonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => TypeOrmTeamEntity, (team) => team.seasons)
  team: TypeOrmTeamEntity;

  @Column()
  name: string;

  @Column({ enum: SeasonStatusEnum, default: SeasonStatusEnum.IN_PROGRESS })
  status: SeasonStatusEnum;

  @Column()
  active: boolean;

  @Column()
  description: string;

  @Column({ nullable: true })
  startDate: Date;

  @Column({ nullable: true })
  endDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(
    () => TypeOrmCompetitionEntity,
    (competition) => competition.season,
  )
  competitions: TypeOrmCompetitionEntity[];
}
