import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { TypeOrmPlanEntity } from '@/lib/plan/infrastructure/type-orm/type-orm-plan.entity';
import { TypeOrmPaymentEntity } from '@/lib/payment/infrastructure/type-orm/type-orm-payment.entity';
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

  @OneToMany(() => TypeOrmTeamEntity, (team) => team.subscription)
  teams: TypeOrmTeamEntity[];

  @ManyToOne(() => TypeOrmPlanEntity, (plan) => plan.subscriptions)
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
  features: TypeOrmSubscriptionFeatureEntity[];

  // relations to
  // users
  // lineups
  // outcomes
  // incomes
}
