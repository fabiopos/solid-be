import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeOrmSubscriptionEntity } from '../../../Subscription/infrastructure/TypeOrm/TypeOrmSubscriptionEntity';

@Entity('payment')
export class TypeOrmPaymentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  transactionId?: string | null;

  @Column()
  transactionState?: string | null;

  @Column({ nullable: true })
  currency?: string | null;

  @Column({ nullable: true })
  polResponseCode?: string | null;

  @Column({ nullable: true })
  polTransactionState?: string | null;

  @Column({ nullable: true })
  description?: string | null;

  @Column({ nullable: true })
  referenceCode?: string | null;

  @Column({ nullable: true })
  txValue?: number | null;

  @Column({ nullable: true })
  reference_pol?: string | null;

  @Column({ nullable: true })
  txTax?: number | null;

  @Column({ nullable: true })
  buyerEmail?: string | null;

  @Column({ nullable: true })
  processingDate?: Date | null;

  @Column({ nullable: true })
  cus?: string | null;

  @Column({ nullable: true })
  trazabilityCode?: string | null;

  @OneToOne(
    () => TypeOrmSubscriptionEntity,
    (subscription) => subscription.payment,
  )
  subscriptions: TypeOrmSubscriptionEntity[];
}
