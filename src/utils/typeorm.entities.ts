import { TypeOrmPlayerEntity } from '../lib/player/infrastructure/TypeOrm/TypeOrmPlayerEntity';
import { TypeOrmTeamEntity } from '../lib/Team/infrastructure/TypeOrm/TypeOrmTeamEntity';
import { TypeOrmSubscriptionEntity } from '../lib/Subscription/infrastructure/TypeOrm/TypeOrmSubscriptionEntity';
import { TypeOrmCompetitionEntity } from '../lib/competition/infrastructure/type-orm/type-orm-competition.entity';
import { TypeOrmFieldPositionEntity } from '../lib/field-position/infrastructure/type-orm/type-orm-field-position.entity';
import { TypeOrmMatchAparitionEntity } from '../lib/match-aparition/infrastructure/TypeOrm/TypeOrmMatchAparitionEntity';
import { TypeOrmMatchEntity } from '../lib/match/infrastructure/TypeOrm/TypeOrmMatchEntity';
import { TypeOrmPaymentEntity } from '../lib/payment/infrastructure/type-orm/TypeOrmPaymentEntity';
import { TypeOrmPlanEntity } from '../lib/plan/infrastructure/TypeOrm/TypeOrmPlanEntity';
import { TypeOrmPlayerPositionEntity } from '../lib/PlayerPosition/infrastructure/TypeOrm/TypeOrmPlayerPositionEntity';
import { TypeOrmUserEntity } from '../lib/User/infrastructure/TypeOrm/TypeOrmUserEntity';
import { TypeOrmSeasonEntity } from '../lib/Season/infrastructure/TypeOrm/TypeOrmSeasonEntity';
import { TypeOrmFeatureEntity } from '../lib/feature/infrastructure/type-orm/type-orm-feature.entity';
import { TypeOrmPlayerInjuryEntity } from '../lib/PlayerInjury/infrastructure/TypeOrm/TypeOrmPlayerInjuryEntity';
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
