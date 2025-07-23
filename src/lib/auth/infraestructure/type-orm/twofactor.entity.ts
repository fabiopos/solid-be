import { TypeOrmTeamEntity } from 'src/lib/team/infrastructure/TypeOrm/TypeOrmTeamEntity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('two_factor')
export class TypeOrmTwoFactorEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column({ default: false })
  status: string;

  @ManyToOne(() => TypeOrmTeamEntity, (item) => item.twoFactorRegs)
  team: TypeOrmTeamEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
