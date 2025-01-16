import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeOrmPlayerEntity } from '../../../player/infrastructure/TypeOrm/TypeOrmPlayerEntity';

@Entity('player_injury')
export class TypeOrmPlayerInjuryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => TypeOrmPlayerEntity)
  @JoinColumn()
  player: TypeOrmPlayerEntity;

  @Column({ type: 'date' })
  startedAt: Date;

  @Column({ type: 'date', nullable: true })
  endsAt: Date;

  @Column({ default: false })
  lowerBody: boolean;

  @Column({ default: false })
  upperBody: boolean;

  @Column({ nullable: true })
  diagnostic: string | null;

  @Column({ default: false })
  leftFoot: boolean;

  @Column({ default: false })
  rightFoot: boolean;

  @Column({ default: true })
  active: boolean;
}
