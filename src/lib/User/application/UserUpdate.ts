import { UserUpdateInput } from '../domain/UserSchema';
import { UserRepository } from '../domain/UserRepository';

export class UserUpdate {
  constructor(private repository: UserRepository) {}

  async run(playerId: string, input: UserUpdateInput) {
    this.repository.edit(playerId, input);
  }
}
