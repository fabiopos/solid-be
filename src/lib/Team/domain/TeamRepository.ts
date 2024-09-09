import { Team } from './Team';

export interface TeamRepository {
  create(team: Team): Promise<void>;
  getAll(): Promise<Team[]>;
  getOneById(id: string): Promise<Team | null>;
  edit(player: Team): Promise<void>;
  delete(id: string): Promise<void>;
}
