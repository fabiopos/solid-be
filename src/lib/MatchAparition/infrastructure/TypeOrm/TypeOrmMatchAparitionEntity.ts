import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeOrmMatchEntity } from '@/lib/Match/infrastructure/TypeOrm/TypeOrmMatchEntity';
import { TypeOrmPlayerEntity } from '@/lib/Player/infrastructure/TypeOrm/TypeOrmPlayerEntity';

@Entity('match_aparition')
export class TypeOrmMatchAparitionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  minutes: number;

  @Column()
  goals: number;

  @Column()
  assists: number;

  @Column()
  yellowCards: number;

  @Column()
  redCards: number;

  @Column()
  injury: boolean;

  @Column()
  manOfTheMatch: boolean;

  @Column()
  rating: number;

  @Column()
  played: boolean;

  @Column()
  confirmed: boolean;

  @OneToOne(() => TypeOrmMatchEntity)
  @JoinColumn()
  match: TypeOrmMatchEntity;

  @OneToOne(() => TypeOrmPlayerEntity)
  @JoinColumn()
  player: TypeOrmPlayerEntity;
}
