import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeOrmFeatureEntity } from '@/lib/feature/infrastructure/type-orm/type-orm-feature.entity';
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

  @ManyToOne(() => TypeOrmFeatureEntity)
  feature: TypeOrmFeatureEntity;

  @ManyToOne(() => TypeOrmSubscriptionEntity, (item) => item.features)
  subscription: TypeOrmSubscriptionEntity;
}
