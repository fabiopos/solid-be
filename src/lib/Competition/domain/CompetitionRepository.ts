import { EmptyCompetition, FulfilledCompetition } from './CompetitionSchema';

export interface CompetitionRepository {
  getAllBySeason(seasonId: string): Promise<FulfilledCompetition[]>;
  getAllByTeam(teamId: string): Promise<FulfilledCompetition[]>;
  findById(competitionId: string): Promise<FulfilledCompetition>;
  create(emptyCompetition: EmptyCompetition): Promise<FulfilledCompetition>;
  update(
    competitionId: string,
    emptyCompetition: EmptyCompetition,
  ): Promise<FulfilledCompetition>;

  delete(competitionId: string): Promise<void>;
}
