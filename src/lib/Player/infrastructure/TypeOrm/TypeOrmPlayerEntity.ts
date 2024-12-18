import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import {
  DominantFoot,
  PlayerStatus,
  ShirtSize,
} from '@/shared/enums/playerEnums';
import { PersonAbstract } from '@/shared/abstracts/PersonAbstract';
import { TypeOrmPlayerPositionEntity } from '@/lib/PlayerPosition/infrastructure/TypeOrm/TypeOrmPlayerPositionEntity';
import { TypeOrmPlayerInjuryEntity } from '@/lib/PlayerInjury/infrastructure/TypeOrm/TypeOrmPlayerInjuryEntity';
import { TypeOrmTeamEntity } from '@/lib/Team/infrastructure/TypeOrm/TypeOrmTeamEntity';
import { TypeOrmFieldPositionEntity } from '@/lib/FieldPosition/infrastructure/TypeOrm/TypeOrmFieldPositionEntity';
import { TypeOrmMatchAparitionEntity } from '@/lib/MatchAparition/infrastructure/TypeOrm/TypeOrmMatchAparitionEntity';

@Entity('player')
export class TypeOrmPlayerEntity extends PersonAbstract {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => TypeOrmTeamEntity)
  team: TypeOrmTeamEntity;

  @ManyToOne(() => TypeOrmFieldPositionEntity, { nullable: true })
  favPosition: TypeOrmFieldPositionEntity;

  @Column({ type: 'enum', enum: DominantFoot, default: DominantFoot.RIGHT })
  dominantFoot: DominantFoot;

  @Column({ type: 'enum', enum: ShirtSize, default: ShirtSize.M })
  shirtSize: ShirtSize;

  @Column()
  shirtNumber: number;

  @Column()
  shirtName: string;

  @CreateDateColumn()
  startSubscriptionDate: Date;

  @Column({ nullable: true })
  bornDate: Date | null;

  @Column({ nullable: true })
  height?: number | null;

  @Column({ nullable: true })
  weight?: number | null;

  @Column({ nullable: true, type: 'date' })
  endSubscriptionDate?: Date | null;

  @Column({ nullable: true })
  arl?: string | null;

  @Column({ nullable: true })
  eps?: string | null;

  @Column({ type: 'enum', enum: PlayerStatus, default: PlayerStatus.OK })
  status?: PlayerStatus;

  @OneToMany(
    () => TypeOrmPlayerPositionEntity,
    (playerPosition) => playerPosition.player,
  )
  playerPositions: TypeOrmPlayerPositionEntity[];

  @OneToMany(() => TypeOrmPlayerInjuryEntity, (injury) => injury.player)
  injuries: TypeOrmPlayerInjuryEntity[];

  @OneToMany(
    () => TypeOrmMatchAparitionEntity,
    (matchAparition) => matchAparition.player,
  )
  matchAparitions: TypeOrmMatchAparitionEntity[];
}
