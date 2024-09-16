import { TeamRepository } from '@/lib/Team/domain/TeamRepository';

export class TeamRepositoryMock implements TeamRepository {
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
}
