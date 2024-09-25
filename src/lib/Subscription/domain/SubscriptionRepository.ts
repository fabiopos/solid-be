import { Subscription } from './Subscription';
import { EmptySubscription, FulfilledSubscription } from './SubscriptionSchema';

export interface SubscriptionRepository {
  create(subscription: EmptySubscription): Promise<FulfilledSubscription>;
  getAll(): Promise<Subscription[]>;
  getOneById(id: string): Promise<Subscription | null>;
  edit(subscription: Subscription): Promise<void>;
  delete(id: string): Promise<void>;
}
