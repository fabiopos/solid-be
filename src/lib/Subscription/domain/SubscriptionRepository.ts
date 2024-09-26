import { Subscription } from './Subscription';
import { EmptySubscription, FulfilledSubscription } from './SubscriptionSchema';

export interface SubscriptionRepository {
  create(subscription: EmptySubscription): Promise<FulfilledSubscription>;
  getAll(): Promise<FulfilledSubscription[]>;
  getOneById(id: string): Promise<FulfilledSubscription | null>;
  edit(subscription: Subscription): Promise<void>;
  delete(id: string): Promise<void>;
}
