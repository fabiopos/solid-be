import { CreatePlayerDto } from '@/shared/dto/CreatePlayerDto';
import { Player } from '../../domain/Player';
import { PlayerRepository } from '../../domain/PlayerRepository';
import { TeamRepository } from '@/lib/Team/domain/TeamRepository';
import { SubscriptionRepository } from '@/lib/Subscription/domain/SubscriptionRepository';
import { PlayerInvalidError } from '../../domain/PlayerInvalidError';
import { FieldPositionRepository } from '@/lib/FieldPosition/application/FieldPositionRepository';

export class PlayerCreate {
  constructor(
    private repository: PlayerRepository,
    private teamRepository: TeamRepository,
    private subscriptionRepository: SubscriptionRepository,
    private fieldPositionRepository: FieldPositionRepository,
  ) {}

  async run(dto: CreatePlayerDto): Promise<void> {
    await this.validate(dto);
    const player = Player.create(dto);
    this.repository.create(player);
  }

  async validate(dto: CreatePlayerDto): Promise<void> {
    // Validation logic here
    if (!dto.teamId) throw new PlayerInvalidError('TeamId is required');
    if (!dto.firstName) throw new PlayerInvalidError('First name is required');
    if (!dto.lastName) throw new PlayerInvalidError('Last name is required');
    if (!dto.email) throw new PlayerInvalidError('Email is required');
    if (!dto.documentNumber)
      throw new PlayerInvalidError('Document number is required');
    if (!dto.documentType)
      throw new PlayerInvalidError('Document type is required');
    if (!dto.shirtName) throw new PlayerInvalidError('Shirt name is required');
    if (!dto.shirtNumber)
      throw new PlayerInvalidError('Shirt number is required');
    if (!dto.shirtSize) throw new PlayerInvalidError('Shirt size is required');
    if (!dto.dominantFoot)
      throw new PlayerInvalidError('Dominant foot is required');

    const existingPlayer = await this.repository.getOneByDocumentNumber(
      dto.documentNumber,
    );
    if (existingPlayer) throw new PlayerInvalidError('Player already exists');

    const team = await this.teamRepository.getOneById(dto.teamId);
    if (!team) throw new PlayerInvalidError('Team not found');

    if (!team.active) throw new PlayerInvalidError('Team is not active');

    const subscription = await this.subscriptionRepository.getOneById(
      team.subscriptionId,
    );
    if (!subscription) throw new PlayerInvalidError('Subscription not found');

    if (!subscription.active)
      throw new PlayerInvalidError('Subscription is not active');

    if (!dto.favPositionId)
      throw new PlayerInvalidError('Favorite position is required');

    const fieldPosition = await this.fieldPositionRepository.getOneById(
      dto.favPositionId,
    );
    if (!fieldPosition)
      throw new PlayerInvalidError('Favorite position is required');
  }
}
