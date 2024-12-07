import {
  EmptyMatchAparition,
  FulfilledMatchAparition,
} from './matchAparition.schema';

export interface MatchAparitionRepository {
  getAll(): Promise<FulfilledMatchAparition[]>;
  getAllByTeam(teamId: string): Promise<FulfilledMatchAparition[]>;
  getAllSortTopScorers(teamId: string): Promise<FulfilledMatchAparition[]>;
  getAllSortTopAsists(teamId: string): Promise<FulfilledMatchAparition[]>;
  getByMatchId(matchId: string): Promise<FulfilledMatchAparition[]>;
  create(
    emptyMatchAparition: EmptyMatchAparition,
  ): Promise<FulfilledMatchAparition>;
  update(
    matchAparitionId: string,
    emptyMatchAparition: EmptyMatchAparition,
  ): Promise<FulfilledMatchAparition>;

  delete(matchAparitionId: string): Promise<void>;
}
