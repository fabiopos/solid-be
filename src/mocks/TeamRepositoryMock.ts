import { Team } from '@/lib/team/domain/Team';
import { TeamRepository } from '@/lib/team/domain/TeamRepository';
import { FulfilledTeam } from '@/lib/team/domain/TeamSchema';

export class TeamRepositoryMock implements TeamRepository {
  getOneByName(name: string): Promise<FulfilledTeam> {
    return Promise.resolve(
      FulfilledTeam.make({
        active: true,
        hasSubscription: true,
        name: name,
        createdAt: new Date(),
      }),
    );
  }
  searchByName(name: string): Promise<FulfilledTeam[]> {
    return Promise.resolve([
      FulfilledTeam.make({
        active: true,
        hasSubscription: true,
        name: name,
        createdAt: new Date(),
      }),
    ]);
  }
  async create(payload: Team) {
    const baseTeam = FulfilledTeam.make({
      active: true,
      hasSubscription: true,
      name: 'team name',
      createdAt: new Date(),
      players: [],
      ...payload,
    });
    return baseTeam;
  }
  async getAll() {
    return [];
  }
  async getOneById(id: string) {
    return FulfilledTeam.make({
      id,
      active: true,
      hasSubscription: true,
      name: 'team name',
      createdAt: new Date(),
    });
  }
  async edit(payload: any) {
    return;
  }
  async delete(id: string) {
    return;
  }
}
