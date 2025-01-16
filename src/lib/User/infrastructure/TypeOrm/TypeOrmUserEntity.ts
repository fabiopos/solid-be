import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { RoleEnum } from '@/shared/enums/role.enum';
import { TypeOrmSubscriptionEntity } from '@/lib/Subscription/infrastructure/TypeOrm/TypeOrmSubscriptionEntity';
import { PersonAbstract } from '@/shared/abstracts/person-abstract';

@Entity('user')
export class TypeOrmUserEntity extends PersonAbstract {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  password: string;

  @Column()
  policy: boolean;

  @Column({ enum: RoleEnum, default: RoleEnum.USER })
  roleId: RoleEnum;

  @ManyToOne(
    () => TypeOrmSubscriptionEntity,
    (subscription) => subscription.users,
  )
  subscription: TypeOrmSubscriptionEntity;
}
