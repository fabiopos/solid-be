import { SubscriptionRepository } from '@/lib/subscription/domain/subscription.repository';
import { UserRepository } from '../domain/UserRepository';
import { User } from '../domain/User';
import { UserAlreadyExistsError } from '../domain/UserAlreadyExistsError';

export class UserCreate {
  constructor(
    private userRepository: UserRepository,
    private subscriptionRepository: SubscriptionRepository,
  ) {}
  async run(user: User) {
    // TODO: validate max number allowed of users per subscription
    const existingUser = await this.userRepository.getOneByEmail(user.email);
    if (existingUser) throw new UserAlreadyExistsError(user.email);
    return this.userRepository.create(user);
  }
}
