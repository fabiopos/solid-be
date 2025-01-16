import { TypeOrmPlayerEntity } from '../lib/player/infrastructure/type-orm/type-orm-player.entity';
import { TypeOrmTeamEntity } from '../lib/Team/infrastructure/TypeOrm/TypeOrmTeamEntity';
import { TypeOrmSubscriptionEntity } from '../lib/Subscription/infrastructure/TypeOrm/TypeOrmSubscriptionEntity';
import { TypeOrmCompetitionEntity } from '../lib/competition/infrastructure/type-orm/type-orm-competition.entity';
import { TypeOrmFieldPositionEntity } from '../lib/field-position/infrastructure/type-orm/type-orm-field-position.entity';
import { TypeOrmMatchAparitionEntity } from '../lib/match-aparition/infrastructure/type-orm/type-orm-match-aparition.entity';
import { TypeOrmMatchEntity } from '../lib/match/infrastructure/type-orm/type-orm-match.entity';
import { TypeOrmPaymentEntity } from '../lib/payment/infrastructure/type-orm/type-orm-payment.entity';
import { TypeOrmPlanEntity } from '../lib/plan/infrastructure/type-orm/type-orm-plan.entity';
import { TypeOrmPlayerPositionEntity } from '../lib/player-position/infrastructure/type-orm/TypeOrmPlayerPositionEntity';
import { TypeOrmUserEntity } from '../lib/User/infrastructure/TypeOrm/TypeOrmUserEntity';
import { TypeOrmSeasonEntity } from '../lib/Season/infrastructure/TypeOrm/TypeOrmSeasonEntity';
import { TypeOrmFeatureEntity } from '../lib/feature/infrastructure/type-orm/type-orm-feature.entity';
import { TypeOrmPlayerInjuryEntity } from '../lib/PlayerInjury/infrastructure/type-orm/type-orm-player-injury.entity';
import { TypeOrmSubscriptionFeatureEntity } from '../lib/SubscriptionFeature/infrastructure/TypeOrm/TypeOrmSubscriptionFeatureEntity';

export default [
  TypeOrmSubscriptionEntity,
  TypeOrmPlayerEntity,
  TypeOrmTeamEntity,
  TypeOrmCompetitionEntity,
  TypeOrmFieldPositionEntity,
  TypeOrmMatchAparitionEntity,
  TypeOrmMatchEntity,
  TypeOrmPaymentEntity,
  TypeOrmPlanEntity,
  TypeOrmPlayerPositionEntity,
  TypeOrmUserEntity,
  TypeOrmSeasonEntity,
  TypeOrmFeatureEntity,
  TypeOrmPlayerInjuryEntity,
  TypeOrmSubscriptionFeatureEntity,
];
