import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { TypeOrmPlanEntity } from '@/lib/Plan/infrastructure/TypeOrm/TypeOrmPlanEntity';
import { TypeOrmPaymentEntity } from '@/lib/Payment/infrastructure/TypeOrm/TypeOrmPaymentEntity';
import { TypeOrmUserEntity } from '@/lib/User/infrastructure/TypeOrm/TypeOrmUserEntity';

import { TypeOrmTeamEntity } from '@/lib/Team/infrastructure/TypeOrm/TypeOrmTeamEntity';
import { TypeOrmSubscriptionFeatureEntity } from '@/lib/SubscriptionFeature/infrastructure/TypeOrm/TypeOrmSubscriptionFeatureEntity';

@Entity('subscription')
export class TypeOrmSubscriptionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: true })
  active: boolean;

  @OneToOne(() => TypeOrmTeamEntity)
  @JoinColumn()
  team: TypeOrmTeamEntity;

  @OneToOne(() => TypeOrmPlanEntity)
  @JoinColumn()
  plan: TypeOrmPlanEntity;

  @OneToOne(() => TypeOrmPaymentEntity)
  @JoinColumn()
  payment: TypeOrmPaymentEntity;

  @OneToMany(() => TypeOrmUserEntity, (user) => user.subscription)
  users: TypeOrmUserEntity[];

  @OneToMany(
    () => TypeOrmSubscriptionFeatureEntity,
    (subFeature) => subFeature.subscription,
  )
  @JoinColumn()
  features: TypeOrmSubscriptionFeatureEntity[];

  // relations to
  // users
  // lineups
  // outcomes
  // incomes
}
