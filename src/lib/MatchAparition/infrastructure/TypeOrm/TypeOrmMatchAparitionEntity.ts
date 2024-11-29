import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column({ type: 'float', nullable: true })
  rating: number;

  @Column()
  played: boolean;

  @Column()
  confirmed: boolean;

  @ManyToOne(() => TypeOrmMatchEntity)
  match: TypeOrmMatchEntity;

  @ManyToOne(() => TypeOrmPlayerEntity)
  player: TypeOrmPlayerEntity;
}
