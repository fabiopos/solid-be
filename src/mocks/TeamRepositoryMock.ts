import { Team } from '../lib/team/domain/Team';
import { TeamRepository } from '../lib/team/domain/TeamRepository';
import { FulfilledTeam } from '../lib/team/domain/TeamSchema';

export class TeamRepositoryMock implements TeamRepository {
  private _teams: FulfilledTeam[] = [];

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
    const team = FulfilledTeam.make({
      active: true,
      hasSubscription: true,
      name: 'team name',
      createdAt: new Date(),
      players: [],
      ...payload,
    });
    this._teams.push(team);
    return team;
  }

  async getAll() {
    return this._teams;
  }

  async getOneById(id: string) {
    const team = this._teams.find((t) => t.id === id);
    if (!team) throw new Error('Team not found');
    return team;
  }

  async edit(payload: any) {
    const index = this._teams.findIndex((t) => t.id === payload.id);
    if (index !== -1) {
      this._teams[index] = { ...this._teams[index], ...payload };
    }
  }

  async delete(id: string) {
    this._teams = this._teams.filter((t) => t.id !== id);
  }
}
