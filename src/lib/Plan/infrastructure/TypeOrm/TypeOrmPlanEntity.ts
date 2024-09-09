import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeOrmSubscriptionEntity } from '@/lib/Subscription/infrastructure/TypeOrm/TypeOrmSubscriptionEntity';

@Entity('plan')
export class TypeOrmPlanEntity {
  @PrimaryGeneratedColumn('uuid')
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
