import * as S from '@effect/schema/Schema';
import { add, isAfter } from 'date-fns';

export const teamSchema = S.Struct({
  name: S.NullishOr(S.String),
});

export type TeamType = S.Schema.Type<typeof teamSchema>;

export const userSchema = S.Struct({
  id: S.optional(S.String),
  firstName: S.NullishOr(S.String),
  lastName: S.NullishOr(S.String),
});

export const planSchema = S.Struct({
  id: S.NullishOr(S.String),
  name: S.NullishOr(S.String),
  interval: S.Trimmed.annotations(S.annotations['month, year']).pipe(
    S.filter((v) => ['years', 'months'].some((f) => f === v)),
  ),
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
  startDate: S.NullishOr(S.Date),
  endDate: S.NullishOr(S.Date),
  createdAt: S.NullishOr(S.Date),
  active: S.NullishOr(S.Boolean),
  paymentId: S.optional(S.String),
  planId: S.NullishOr(S.String),
  teams: S.optional(S.Array(teamSchema)),
  users: S.optional(S.Array(userSchema)),
  plan: planSchema,
});

export type SourceSubscriptionType = S.Schema.Type<typeof SourceSubscription>;

export class EmptySubscription extends S.TaggedClass<EmptySubscription>()(
  'EmptySubscription',
  {
    planId: SourceSubscription.fields.planId,
    plan: SourceSubscription.fields.plan,
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
}
