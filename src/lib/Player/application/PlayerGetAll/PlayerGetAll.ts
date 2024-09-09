import { Player } from '@/lib/Player/domain/Player';
import { PlayerRepository } from '@/lib/Player/domain/PlayerRepository';

export class PlayerGetAll {
  /**
   *
   */
  constructor(private repository: PlayerRepository) {}

  async run(): Promise<Player[]> {
    return this.repository.getAll();
  }
}
