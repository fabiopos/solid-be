import { PlayerPositionRepository } from '@/lib/PlayerPosition/domain/PlayerPositionRepository';
import { PlayerRepository } from '../../domain/PlayerRepository';
import { FieldPositionRepository } from '@/lib/FieldPosition/domain/FieldPositionRepository';
import { SubscriptionRepository } from '@/lib/Subscription/domain/SubscriptionRepository';
import { TeamRepository } from '@/lib/Team/domain/TeamRepository';
import { PartialPlayer } from '../../domain/PlayerSchema';
import { PlayerNotFoundError } from '../../domain/PlayerNotFoundError';

export class PlayerUpdate {
  constructor(
    private repository: PlayerRepository,
    private teamRepository: TeamRepository,
    private subscriptionRepository: SubscriptionRepository,
    private fieldPositionRepository: FieldPositionRepository,
    private playerPositionRepository: PlayerPositionRepository,
  ) {}

  async run(playerId: string, payload: PartialPlayer) {
    //
    const player = await this.repository.getOneById(playerId);
    if (!player) throw new PlayerNotFoundError();

    return await this.repository.edit(playerId, payload);
  }
}
