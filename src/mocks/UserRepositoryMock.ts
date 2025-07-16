import { User } from '../lib/user/domain/User';
import { UserRepository } from '../lib/user/domain/UserRepository';
import { DocumentType } from '../shared/enums/player.enum';
import { RoleEnum } from '../shared/enums/role.enum';
import { FulfilledUser, UserUpdateInput } from '../lib/User/domain/UserSchema';

export class UserRepositoryMock implements UserRepository {
  private _users: (User & { id: string })[] = [];

  async create(payload: User): Promise<User> {
    const baseUser = User.create({
      active: true,
      documentNumber: '124',
      documentType: DocumentType.CC,
      email: 'email@email.com',
      firstName: 'First',
      lastName: 'Last',
      password: '122345',
      policy: true,
      roleId: 'user',
      ...payload,
    });
    const userWithId = { ...baseUser, id: crypto.randomUUID() };
    this._users.push(userWithId);
    return userWithId;
  }

  async getAll(): Promise<FulfilledUser[]> {
    return this._users as unknown as FulfilledUser[];
  }

  async getOneById(id: string): Promise<User | null> {
    const user = this._users.find((u) => u.id === id);
    if (!user) throw new Error('User not found');
    return user ?? null;
  }

  async edit(userId: string, user: UserUpdateInput): Promise<void> {
    const index = this._users.findIndex((u) => u.id === userId);
    if (index !== -1) {
      this._users[index] = { ...this._users[index], ...user };
    }
  }

  async delete(id: string): Promise<void> {
    this._users = this._users.filter((u) => u.id !== id);
  }

  async getOneByEmail(email: string): Promise<User> {
    const found = this._users.find((u) => u.email === email);
    if (!found) {
      const baseUser = User.create({
        active: true,
        documentNumber: '124',
        documentType: DocumentType.CC,
        email: email,
        firstName: 'First',
        lastName: 'Last',
        password: '122345',
        policy: true,
        roleId: RoleEnum.USER,
      });

      const userWithId = { ...baseUser, id: crypto.randomUUID() };
      this._users.push(userWithId);
      return userWithId;
    }

    return found;
  }
}
