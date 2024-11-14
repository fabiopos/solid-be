import { UserRepository } from '../domain/UserRepository';

export class UserDelete {
  constructor(private readonly repository: UserRepository) {}

  run(userId: string) {
    return this.repository.delete(userId);
  }
}
