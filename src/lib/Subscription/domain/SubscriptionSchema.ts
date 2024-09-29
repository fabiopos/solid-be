import {
  subscriptionFeatureCreateSchema,
  subscriptionFeatureSchema,
} from '@/lib/SubscriptionFeature/domain/SubscriptionFeatureSchema';
import { teamCreateSchema } from '@/lib/Team/domain/TeamSchema';
import { DocumentType } from '@/shared/enums/playerEnums';
import * as S from '@effect/schema/Schema';
import { add, isAfter } from 'date-fns';

export const userSchema = S.Struct({
  id: S.optional(S.String),
  firstName: S.NullishOr(S.String),
  lastName: S.NullishOr(S.String),
  documentNumber: S.String,
  documentType: S.Enums(DocumentType),
  policy: S.Boolean,
  email: S.String,
  password: S.String,
});

export const planSchema = S.Struct({
  id: S.NullishOr(S.String),
  name: S.Trimmed,
  interval: S.Trimmed,
  intervalCount: S.Number,
  createdAt: S.NullishOr(S.Date),
  active: S.Boolean,
  price: S.NullishOr(S.Number),
  description: S.NullishOr(S.String),
  currency: S.NullishOr(S.String),
});

export const SourceSubscription = S.Struct({
  id: S.NullishOr(S.String),
  name: S.NullishOr(S.String),
  startDate: S.NullishOr(S.Union(S.Date, S.String)),
  endDate: S.NullishOr(S.Union(S.Date, S.String)),
  createdAt: S.NullishOr(S.Date),
  active: S.NullishOr(S.Boolean),
  planId: S.NullishOr(S.String),
  paymentId: S.optional(S.String),
  teams: S.optional(S.Array(teamCreateSchema)),
  users: S.optional(S.Array(userSchema)),
  plan: S.optional(planSchema),
  features: S.optional(S.Array(subscriptionFeatureCreateSchema)),
});

export type SourceSubscriptionType = S.Schema.Type<typeof SourceSubscription>;
export type PlanType = S.Schema.Type<typeof planSchema>;

export class EmptySubscription extends S.TaggedClass<EmptySubscription>()(
  'EmptySubscription',
  {
    planId: SourceSubscription.fields.planId,
    plan: SourceSubscription.fields.plan,
    teams: SourceSubscription.fields.teams,
    features: S.optional(S.Array(subscriptionFeatureCreateSchema)),
    users: SourceSubscription.fields.users,
  },
) {
  get name(): string {
    return `subscription-${this.planId}`;
  }

  get startDate() {
    return new Date();
  }

  get active(): boolean {
    return true;
  }

  get endDate(): Date {
    return add(new Date(), { [this.plan.interval]: this.plan.intervalCount });
  }
}

export class FulfilledSubscription extends S.TaggedClass<FulfilledSubscription>()(
  'FulfilledSubscription',
  {
    ...SourceSubscription.fields,
  },
) {
  get isExpired(): boolean {
    return isAfter(new Date(), this.endDate);
  }

  get paymentRequired(): boolean {
    return false;
  }

  get usersCount(): number {
    return (this.users ?? []).length;
  }

  get teamsCount(): number {
    return (this.teams ?? []).length;
  }
}

export class SubscriptionCreateResponse extends S.TaggedClass<SubscriptionCreateResponse>()(
  'SubscriptionCreateResponse',
  {
    id: SourceSubscription.fields.id,
    name: SourceSubscription.fields.name,
    startDate: SourceSubscription.fields.startDate,
    endDate: SourceSubscription.fields.endDate,
    active: SourceSubscription.fields.active,
    planId: SourceSubscription.fields.planId,
    teams: SourceSubscription.fields.teams,
    users: S.Array(userSchema.pick('firstName', 'lastName', 'id')),
    plan: SourceSubscription.fields.plan,
    features: S.Array(
      subscriptionFeatureSchema.pick('max', 'featureId', 'enabled'),
    ),
  },
) {}
