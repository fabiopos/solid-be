import {
  EmptyMatchAparition,
  FulfilledMatchAparition,
} from './matchAparition.schema';

export interface MatchAparitionRepository {
  getAll(): Promise<FulfilledMatchAparition[]>;
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
