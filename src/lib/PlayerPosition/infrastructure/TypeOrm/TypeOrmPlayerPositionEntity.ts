import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeOrmPlayerEntity } from '@/lib/player/infrastructure/TypeOrm/TypeOrmPlayerEntity';
import { TypeOrmFieldPositionEntity } from '@/lib//FieldPosition/infrastructure/TypeOrm/TypeOrmFieldPositionEntity';

@Entity('player_position')
export class TypeOrmPlayerPositionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => TypeOrmPlayerEntity)
  player: TypeOrmPlayerEntity;

  @ManyToOne(() => TypeOrmFieldPositionEntity)
  fieldPosition: TypeOrmFieldPositionEntity;
}
