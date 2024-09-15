import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { RoleEnum } from '@/shared/enums/roleEnum';
import { TypeOrmSubscriptionEntity } from '@/lib/Subscription/infrastructure/TypeOrm/TypeOrmSubscriptionEntity';
import { PersonAbstract } from '@/shared/abstracts/PersonAbstract';

@Entity('user')
export class TypeOrmUserEntity extends PersonAbstract {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  password: string;

  @Column()
  policy: boolean;

  @Column({ enum: RoleEnum, default: RoleEnum.USER })
  roleId: string;

  @ManyToOne(() => TypeOrmSubscriptionEntity)
  subscription: TypeOrmSubscriptionEntity;
}
