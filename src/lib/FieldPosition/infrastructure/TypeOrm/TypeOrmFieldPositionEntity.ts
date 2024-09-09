import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { TypeOrmPlayerPositionEntity } from '../../../PlayerPosition/infrastructure/TypeOrm/TypeOrmPlayerPositionEntity';

@Entity('field_position')
export class TypeOrmFieldPositionEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  order: number;

  @Column({ nullable: true })
  description: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(
    () => TypeOrmPlayerPositionEntity,
    (playerPositions) => playerPositions.fieldPosition,
  )
  players: TypeOrmPlayerPositionEntity[];
}
