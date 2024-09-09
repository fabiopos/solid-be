import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeOrmFeatureEntity } from '@/lib/Feature/infrastructure/TypeOrm/TypeOrmFeatureEntity';
import { TypeOrmSubscriptionEntity } from '@/lib/Subscription/infrastructure/TypeOrm/TypeOrmSubscriptionEntity';

@Entity('subscription_feature')
export class TypeOrmSubscriptionFeatureEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  enabled: boolean;

  @Column()
  max: number;

  @OneToOne(() => TypeOrmFeatureEntity)
  @JoinColumn()
  feature: TypeOrmFeatureEntity;

  @OneToOne(() => TypeOrmSubscriptionEntity)
  @JoinColumn()
  subscription: TypeOrmSubscriptionEntity;
}
