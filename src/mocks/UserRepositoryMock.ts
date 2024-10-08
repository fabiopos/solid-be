import { User } from '@/lib/User/domain/User';
import { UserRepository } from '@/lib/User/domain/UserRepository';
import { DocumentType } from '@/shared/enums/playerEnums';
import { RoleEnum } from '@/shared/enums/roleEnum';

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
