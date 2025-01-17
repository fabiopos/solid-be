import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { TypeOrmPlayerEntity } from '../../../../lib/player/infrastructure/type-orm/type-orm-player.entity';
import { TypeOrmSubscriptionEntity } from '../../../../lib/subscription/infrastructure/type-orm/type-orm-subscription.entity';
import { TeamAbstract } from '../../../../shared/abstracts/team-abstract';
import { TypeOrmMatchEntity } from '../../../../lib/match/infrastructure/type-orm/type-orm-match.entity';
import { TypeOrmSeasonEntity } from '../../../../lib/season/infrastructure/type-orm/type-orm-season.entity';

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
