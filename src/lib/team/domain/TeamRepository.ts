import { Team } from './Team';
import { FulfilledTeam, TeamType } from './TeamSchema';

export interface TeamRepository {
  create(team: Team): Promise<FulfilledTeam>;
  getAll(subscriptionId: string): Promise<FulfilledTeam[]>;
  getOneById(id: string): Promise<FulfilledTeam>;
  edit(player: TeamType): Promise<void>;
  delete(id: string): Promise<void>;
  getOneByName(name: string): Promise<FulfilledTeam>;
  searchByName(name: string, subscriptionId: string): Promise<FulfilledTeam[]>;
}
