import { TypeOrmPlayerEntity } from '../lib/Player/infrastructure/TypeOrm/TypeOrmPlayerEntity';
import { TypeOrmTeamEntity } from '../lib/Team/infrastructure/TypeOrm/TypeOrmTeamEntity';
import { TypeOrmSubscriptionEntity } from '../lib/Subscription/infrastructure/TypeOrm/TypeOrmSubscriptionEntity';
import { TypeOrmCompetitionEntity } from '../lib/Competition/infrastructure/TypeOrm/TypeOrmCompetitionEntity';
import { TypeOrmFieldPositionEntity } from '../lib/FieldPosition/infrastructure/TypeOrm/TypeOrmFieldPositionEntity';
import { TypeOrmMatchAparitionEntity } from '../lib/MatchAparition/infrastructure/TypeOrm/TypeOrmMatchAparitionEntity';
import { TypeOrmMatchEntity } from '../lib/Match/infrastructure/TypeOrm/TypeOrmMatchEntity';
import { TypeOrmPaymentEntity } from '../lib/Payment/infrastructure/TypeOrm/TypeOrmPaymentEntity';
import { TypeOrmPlanEntity } from '../lib/Plan/infrastructure/TypeOrm/TypeOrmPlanEntity';
import { TypeOrmPlayerPositionEntity } from '../lib/PlayerPosition/infrastructure/TypeOrm/TypeOrmPlayerPositionEntity';
import { TypeOrmUserEntity } from '../lib/User/infrastructure/TypeOrm/TypeOrmUserEntity';
import { TypeOrmSeasonEntity } from '../lib/Season/infrastructure/TypeOrm/TypeOrmSeasonEntity';
import { TypeOrmFeatureEntity } from '../lib/Feature/infrastructure/TypeOrm/TypeOrmFeatureEntity';
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
