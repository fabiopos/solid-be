import { UserRepository } from '../domain/UserRepository';

export class UserGetAll {
  constructor(private repository: UserRepository) {}

  async run(subscriptionId: string) {
    return this.repository.getAll(subscriptionId);
  }
}
