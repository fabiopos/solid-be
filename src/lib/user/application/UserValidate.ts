import { UserRepository } from '../domain/UserRepository';
import { UserValidateInput } from '../domain/UserValidateInput';

export class UserValidate {
  constructor(private userRepository: UserRepository) {}

  async run(payload: UserValidateInput): Promise<boolean> {
    const { email } = payload;
    if (!email) return false;
    const user = await this.userRepository.getOneByEmail(email);
    return user === null;
  }
}
