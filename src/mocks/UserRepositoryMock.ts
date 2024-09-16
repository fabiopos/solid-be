import { UserRepository } from '@/lib/User/domain/UserRepository';

export class UserRepositoryMock implements UserRepository {
  async create(payload: any) {
    return payload;
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
    return null;
  }
}
