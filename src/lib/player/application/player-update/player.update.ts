import { Logger } from '@nestjs/common';

import { PlayerPositionRepository } from '../../../../lib/player-position/domain/player-position.repository';
import { PlayerRepository } from '../../domain/player.repository';
import { FieldPositionRepository } from '../../../../lib/field-position/domain/field-position.repository';
import { SubscriptionRepository } from '../../../../lib/subscription/domain/subscription.repository';
import { TeamRepository } from '../../../../lib/team/domain/TeamRepository';
import { PartialPlayer } from '../../domain/player.schema';
import { PlayerNotFoundError } from '../../domain/player-not-found-error';

export class PlayerUpdate {
  constructor(
    private repository: PlayerRepository,
    private teamRepository: TeamRepository,
    private subscriptionRepository: SubscriptionRepository,
    private fieldPositionRepository: FieldPositionRepository,
    private playerPositionRepository: PlayerPositionRepository,
  ) {}

  private readonly logger = new Logger(PlayerUpdate.name);

  async run(playerId: string, payload: PartialPlayer) {
    const player = await this.repository.getOneById(playerId);
    if (!player) throw new PlayerNotFoundError();

    return await this.repository.edit(playerId, payload);
  }

  async updatePlayerPositions(
    playerId: string,
    favPosition: string,
    positions: string[],
  ) {
    this.logger.log('AP player field positions', favPosition, positions);

    await this.playerPositionRepository.updatePlayerPositions(
      playerId,
      positions,
    );

    return await this.repository.updatePlayerPositions(playerId, favPosition);
  }
}
