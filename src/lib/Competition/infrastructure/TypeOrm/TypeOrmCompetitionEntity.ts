import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeOrmSeasonEntity } from '@/lib/Season/infrastructure/TypeOrm/TypeOrmSeasonEntity';

import { TypeOrmMatchEntity } from '@/lib/Match/infrastructure/TypeOrm/TypeOrmMatchEntity';
import { CompetitionStatusEnum } from '@/shared/enums/competitionStatusEnum';

@Entity('competition')
export class TypeOrmCompetitionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  name: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate?: Date | null;

  @Column({
    enum: CompetitionStatusEnum,
    default: CompetitionStatusEnum.IN_PROGRESS,
  })
  status: CompetitionStatusEnum;

  @Column({ nullable: true })
  description: string | null;

  @ManyToOne(() => TypeOrmSeasonEntity, (e) => e.competitions)
  season: TypeOrmSeasonEntity;

  @OneToMany(() => TypeOrmMatchEntity, (match) => match.competition)
  matches: TypeOrmMatchEntity[];
}
