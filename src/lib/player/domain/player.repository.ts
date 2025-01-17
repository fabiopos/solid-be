import {
  EmptyPlayer,
  FulfilledPlayer,
  UpdatePlayerType,
} from './player.schema';

export interface PlayerRepository {
  create(player: EmptyPlayer): Promise<FulfilledPlayer>;
  getAll(teamId: string): Promise<FulfilledPlayer[]>;
  getAllByTeam(teamId: string, limit?: number): Promise<FulfilledPlayer[]>;
  getAllByTeamWithFilters(
    teamId: string,
    limit?: number,
    active?: boolean,
  ): Promise<FulfilledPlayer[]>;
  getOneById(id: string): Promise<FulfilledPlayer>;
  edit(id: string, player: UpdatePlayerType): Promise<FulfilledPlayer>;
  delete(id: string): Promise<void>;
  getOneByDocumentNumber(
    documentNumber: string,
  ): Promise<FulfilledPlayer | null>;

  getOneByEmail(email: string): Promise<FulfilledPlayer | null>;
  getByPositionId(
    teamId: string,
    positionId: string,
  ): Promise<FulfilledPlayer[]>;
  searchByName(teamId: string, name: string): Promise<FulfilledPlayer[]>;
  updatePlayerPositions(pid: string, favPosition: string): Promise<void>;
}
