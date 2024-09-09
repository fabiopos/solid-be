import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeOrmPlayerEntity } from '@/lib/Player/infrastructure/TypeOrm/TypeOrmPlayerEntity';
import { FieldPositionCategoryEnum } from '@/shared/enums/fieldPositionCategoryEnum';
import { TypeOrmFieldPositionEntity } from '@/lib//FieldPosition/infrastructure/TypeOrm/TypeOrmFieldPositionEntity';

@Entity('player_position')
export class TypeOrmPlayerPositionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    enum: FieldPositionCategoryEnum,
    default: FieldPositionCategoryEnum.MIDFIELDER,
  })
  category: FieldPositionCategoryEnum;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => TypeOrmPlayerEntity)
  @JoinColumn()
  player: TypeOrmPlayerEntity;

  @OneToOne(() => TypeOrmFieldPositionEntity)
  @JoinColumn()
  fieldPosition: TypeOrmFieldPositionEntity;
}
