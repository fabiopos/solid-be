import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeOrmPlayerEntity } from '../../../../lib/player/infrastructure/type-orm/type-orm-player.entity';
import { TypeOrmFieldPositionEntity } from '../../../../lib/field-position/infrastructure/type-orm/type-orm-field-position.entity';

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
