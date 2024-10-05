import { PlayerPositionRepository } from '@/lib/PlayerPosition/domain/PlayerPositionRepository';
import { PlayerRepository } from '../../domain/PlayerRepository';
import { PlayerNotFoundError } from '../../domain/PlayerNotFoundError';

export class PlayerDelete {
  constructor(
    private repository: PlayerRepository,
    private playerPositionRepository: PlayerPositionRepository,
  ) {}

  async run(id: string) {
    // 1. delete relations
    const player = await this.repository.getOneById(id);
    if (!player) throw new PlayerNotFoundError();
    // 1.1 delete player-positions
    await this.playerPositionRepository.delete(id);
    // 2. delete player
    await this.repository.delete(id);
  }
}
