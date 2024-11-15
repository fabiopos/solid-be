import { EmptySeason, FulfilledSeason, PartialSeason } from './SeasonSchema';

export interface SeasonRepository {
  getAll(teamId: string): Promise<FulfilledSeason[]>;
  create(emptySeason: EmptySeason): Promise<FulfilledSeason>;
  update(
    seasonId: string,
    seasonToUpdate: PartialSeason,
  ): Promise<FulfilledSeason>;
  deleteSeason(seasonId: string): Promise<void>;
}
