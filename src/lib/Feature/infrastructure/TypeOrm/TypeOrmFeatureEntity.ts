import { TypeOrmSubscriptionFeatureEntity } from '@/lib/SubscriptionFeature/infrastructure/TypeOrm/TypeOrmSubscriptionFeatureEntity';
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
