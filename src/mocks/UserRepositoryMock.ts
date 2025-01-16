import { User } from '@/lib/user/domain/User';
import { UserRepository } from '@/lib/user/domain/UserRepository';
import { DocumentType } from '@/shared/enums/player.enum';
import { RoleEnum } from '@/shared/enums/role.enum';

export class UserRepositoryMock implements UserRepository {
  async create(payload: any) {
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
    return { ...baseUser, id: '1234' };
  }
  async getAll() {
    return [];
  }
  async getOneById(id: string) {
    return null;
  }
  async edit(payload: any) {
    return;
  }
  async delete(id: string) {
    return;
  }
  async getOneByEmail(email: string) {
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
    return { ...baseUser, id: '123' };
  }
}
