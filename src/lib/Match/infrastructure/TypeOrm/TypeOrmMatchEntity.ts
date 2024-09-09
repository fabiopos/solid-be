import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { TypeOrmCompetitionEntity } from '../../../Competition/infrastructure/TypeOrm/TypeOrmCompetitionEntity';
import { TypeOrmMatchAparitionEntity } from '../../../MatchAparition/infrastructure/TypeOrm/TypeOrmMatchAparitionEntity';
import { TypeOrmTeamEntity } from '@/lib/Team/infrastructure/TypeOrm/TypeOrmTeamEntity';

@Entity('match')
export class TypeOrmMatchEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  title: string;

  @OneToOne(() => TypeOrmTeamEntity)
  @JoinColumn()
  homeTeam: TypeOrmTeamEntity;

  @OneToOne(() => TypeOrmTeamEntity)
  @JoinColumn()
  awayTeam: TypeOrmTeamEntity;

  @Column({ nullable: true })
  awayScore?: number | null;

  @Column({ nullable: true })
  homeScore?: number | null;

  @Column({ nullable: true })
  matchDay?: Date | null;

  @Column({ nullable: true })
  matchHour?: Date | null;

  @Column()
  wo: boolean;

  @Column({ nullable: true })
  location?: string | null;

  @Column()
  completed: boolean;

  @OneToOne(() => TypeOrmCompetitionEntity)
  @JoinColumn()
  competition: TypeOrmCompetitionEntity;

  @OneToMany(
    () => TypeOrmMatchAparitionEntity,
    (matchAparition) => matchAparition.match,
  )
  matchAparitions: TypeOrmMatchAparitionEntity[];
}
