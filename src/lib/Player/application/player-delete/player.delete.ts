import { PlayerPositionRepository } from '@/lib/player-position/domain/player-position.repository';
import { PlayerRepository } from '../../domain/player.repository';
import { PlayerNotFoundError } from '../../domain/player-not-found-error';

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
