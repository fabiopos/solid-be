import { Subscription } from './subscription';
import { EmptySubscription, FulfilledSubscription } from './subscription.schema';

export interface SubscriptionRepository {
  create(subscription: EmptySubscription): Promise<FulfilledSubscription>;
  getAll(): Promise<FulfilledSubscription[]>;
  getOneById(id: string): Promise<FulfilledSubscription | null>;
  edit(subscription: Subscription): Promise<void>;
  delete(id: string): Promise<void>;
}
