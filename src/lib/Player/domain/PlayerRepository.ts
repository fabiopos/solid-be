import { EmptyPlayer, FulfilledPlayer, UpdatePlayerType } from './PlayerSchema';

export interface PlayerRepository {
  create(player: EmptyPlayer): Promise<FulfilledPlayer>;
  getAll(teamId: string): Promise<FulfilledPlayer[]>;
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
}
