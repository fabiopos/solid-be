import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { TypeOrmPlayerEntity } from '@/lib/player/infrastructure/TypeOrm/TypeOrmPlayerEntity';

import { TypeOrmSubscriptionEntity } from '@/lib/Subscription/infrastructure/TypeOrm/TypeOrmSubscriptionEntity';
import { TeamAbstract } from '@/shared/abstracts/TeamAbstract';
import { TypeOrmMatchEntity } from '@/lib/match/infrastructure/TypeOrm/TypeOrmMatchEntity';
import { TypeOrmSeasonEntity } from '@/lib/Season/infrastructure/TypeOrm/TypeOrmSeasonEntity';

@Entity('team')
export class TypeOrmTeamEntity extends TeamAbstract {
  @Column({ default: true })
  hasSubscription: boolean; // Indica si el equipo tiene una subscripción activa

  @OneToMany(() => TypeOrmPlayerEntity, (player) => player.team)
  players: TypeOrmPlayerEntity[];

  @ManyToOne(
    () => TypeOrmSubscriptionEntity,
    (subscription) => subscription.teams,
  )
  subscription: TypeOrmSubscriptionEntity;

  @OneToMany(() => TypeOrmMatchEntity, (match) => match.homeTeam)
  homeMatches: TypeOrmMatchEntity[];

  @OneToMany(() => TypeOrmMatchEntity, (match) => match.awayTeam)
  awayMatches: TypeOrmMatchEntity[];

  @OneToMany(() => TypeOrmSeasonEntity, (season) => season.team)
  seasons: TypeOrmSeasonEntity[];

  // relations to
  // seasons
}
