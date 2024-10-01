import { PlayerRepository } from '@/lib/Player/domain/PlayerRepository';
import { FulfilledPlayer } from '../../domain/PlayerSchema';

export class PlayerGetAll {
  constructor(private repository: PlayerRepository) {}

  async run(teamId: string): Promise<FulfilledPlayer[]> {
    return this.repository.getAll(teamId);
  }
}
