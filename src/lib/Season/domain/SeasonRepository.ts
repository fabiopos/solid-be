import { EmptySeason, FulfilledSeason, PartialSeason } from './SeasonSchema';

export interface SeasonRepository {
  find(seasonId: string): Promise<FulfilledSeason>;
  getAllBySubscription(subscriptionId: string): Promise<FulfilledSeason[]>;
  getAll(teamId: string): Promise<FulfilledSeason[]>;
  create(emptySeason: EmptySeason): Promise<FulfilledSeason>;
  update(
    seasonId: string,
    seasonToUpdate: PartialSeason,
  ): Promise<FulfilledSeason>;
  deleteSeason(seasonId: string): Promise<void>;
  getSeasonTreeByTeam(teamId: string): Promise<FulfilledSeason[]>;
}
