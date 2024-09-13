import { Subscription } from './Subscription';

export interface SubscriptionRepository {
  create(subscription: Subscription): Promise<Subscription>;
  getAll(): Promise<Subscription[]>;
  getOneById(id: string): Promise<Subscription | null>;
  edit(subscription: Subscription): Promise<void>;
  delete(id: string): Promise<void>;
}
