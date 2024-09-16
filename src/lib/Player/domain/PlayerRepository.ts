import { Player } from './Player';

export interface PlayerRepository {
  create(player: Player): Promise<void>;
  getAll(): Promise<Player[]>;
  getOneById(id: string): Promise<Player | null>;
  edit(player: Player): Promise<void>;
  delete(id: string): Promise<void>;
  getOneByDocumentNumber(documentNumber: string): Promise<Player | null>;
}
