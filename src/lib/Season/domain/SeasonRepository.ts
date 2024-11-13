import { EmptySeason, FulfilledSeason } from './SeasonSchema';

export interface SeasonRepository {
  getAll(teamId: string): Promise<FulfilledSeason[]>;
  create(emptySeason: EmptySeason): Promise<FulfilledSeason>;
}
