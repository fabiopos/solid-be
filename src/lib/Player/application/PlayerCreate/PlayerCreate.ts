import { CreatePlayerDto } from '@/shared/dto/CreatePlayerDto';
import { Player } from '../../domain/Player';
import { PlayerRepository } from '../../domain/PlayerRepository';

export class PlayerCreate {
  constructor(private repository: PlayerRepository) {}

  async run(dto: CreatePlayerDto): Promise<void> {
    const player = Player.create(dto);
    this.repository.create(player);
  }
}
