import { UserRepository } from '../domain/UserRepository';

export class UserFindBy {
  constructor(private userRepository: UserRepository) {}

  findByEmail(email: string) {
    return this.userRepository.getOneByEmail(email);
  }
}
