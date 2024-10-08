import { User } from './User';
import { UserUpdateInput } from './UserSchema';

export interface UserRepository {
  create(payload: User): Promise<User>;
  getAll(): Promise<User[]>;
  getOneById(id: string): Promise<User | null>;
  edit(userId: string, user: UserUpdateInput): Promise<void>;
  delete(id: string): Promise<void>;
  getOneByEmail(email: string): Promise<User>;
}
