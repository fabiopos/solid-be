import { Column, Entity, OneToMany } from 'typeorm';
import { TypeOrmPlayerEntity } from '@/lib/Player/infrastructure/TypeOrm/TypeOrmPlayerEntity';

import { TypeOrmSubscriptionEntity } from '@/lib/Subscription/infrastructure/TypeOrm/TypeOrmSubscriptionEntity';
import { TeamAbstract } from '@/shared/abstracts/TeamAbstract';
import { TypeOrmMatchEntity } from '@/lib/Match/infrastructure/TypeOrm/TypeOrmMatchEntity';

@Entity('team')
export class TypeOrmTeamEntity extends TeamAbstract {
  @Column({ default: true })
  hasSubscription: boolean; // Indica si el equipo tiene una subscripción activa

  @OneToMany(() => TypeOrmPlayerEntity, (player) => player.team)
  players: TypeOrmPlayerEntity[];

  @OneToMany(
    () => TypeOrmSubscriptionEntity,
    (subscription) => subscription.team,
  )
  subscriptions: TypeOrmSubscriptionEntity[];

  @OneToMany(() => TypeOrmMatchEntity, (match) => match.homeTeam)
  homeMatches: TypeOrmMatchEntity[];

  @OneToMany(() => TypeOrmMatchEntity, (match) => match.awayTeam)
  awayMatches: TypeOrmMatchEntity[];

  // relations to
  // seasons
}
