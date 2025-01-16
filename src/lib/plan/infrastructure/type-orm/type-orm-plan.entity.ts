import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { TypeOrmSubscriptionEntity } from '@/lib/subscription/infrastructure/type-orm/type-orm-subscription.entity';

@Entity('plan')
export class TypeOrmPlanEntity {
  @PrimaryColumn()
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  name: string;

  @Column()
  active: boolean;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  currency: string;

  @Column()
  interval: string;

  @Column()
  intervalCount: number;

  @OneToMany(
    () => TypeOrmSubscriptionEntity,
    (subscription) => subscription.plan,
  )
  subscriptions: TypeOrmSubscriptionEntity[];
}
