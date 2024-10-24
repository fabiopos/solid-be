import { UserRepository } from '../domain/UserRepository';

export class UserGetAll {
  constructor(private repository: UserRepository) {}

  async run() {
    return this.repository.getAll();
  }
}
