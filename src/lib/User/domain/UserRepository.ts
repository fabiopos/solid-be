import { User } from './User';

export interface UserRepository {
  create(payload: User): Promise<User>;
  getAll(): Promise<User[]>;
  getOneById(id: string): Promise<User | null>;
  edit(user: User): Promise<void>;
  delete(id: string): Promise<void>;
  getOneByEmail(email: string): Promise<User>;
}
