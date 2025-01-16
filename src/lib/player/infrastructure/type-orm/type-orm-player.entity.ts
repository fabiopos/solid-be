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
} from '@/shared/enums/player.enum';
import { PersonAbstract } from '@/shared/abstracts/PersonAbstract';
import { TypeOrmPlayerPositionEntity } from '@/lib/player-position/infrastructure/type-orm/TypeOrmPlayerPositionEntity';
import { TypeOrmPlayerInjuryEntity } from '@/lib/PlayerInjury/infrastructure/type-orm/type-orm-player-injury.entity';
import { TypeOrmTeamEntity } from '@/lib/Team/infrastructure/TypeOrm/TypeOrmTeamEntity';
import { TypeOrmFieldPositionEntity } from '@/lib/field-position/infrastructure/type-orm/type-orm-field-position.entity';
import { TypeOrmMatchAparitionEntity } from '@/lib/match-aparition/infrastructure/type-orm/type-orm-match-aparition.entity';

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
