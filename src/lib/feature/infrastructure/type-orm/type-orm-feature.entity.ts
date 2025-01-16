import { TypeOrmSubscriptionFeatureEntity } from '@/lib/subscription-feature/infrastructure/type-orm/type-orm-subscription-feature.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('feature')
export class TypeOrmFeatureEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: 10 })
  defaultMax: number;

  @Column()
  enabled: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => TypeOrmSubscriptionFeatureEntity, (item) => item.feature)
  subFeatures: TypeOrmSubscriptionFeatureEntity[];
}
