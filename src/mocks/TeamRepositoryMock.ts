import { Team } from '@/lib/Team/domain/Team';
import { TeamRepository } from '@/lib/Team/domain/TeamRepository';

export class TeamRepositoryMock implements TeamRepository {
  getOneByName(name: string): Promise<Team | null> {
    return Promise.resolve(
      Team.create({
        active: true,
        hasSubscription: true,
        name: name,
        createdAt: new Date(),
      }),
    );
  }
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
