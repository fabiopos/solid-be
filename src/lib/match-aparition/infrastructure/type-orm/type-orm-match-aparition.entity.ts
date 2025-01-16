import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TypeOrmMatchEntity } from '@/lib/match/infrastructure/type-orm/type-orm-match.entity';
import { TypeOrmPlayerEntity } from '@/lib/player/infrastructure/type-orm/type-orm-player.entity';

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
