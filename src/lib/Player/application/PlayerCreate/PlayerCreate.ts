import { CreatePlayerDto } from '@/shared/dto/CreatePlayerDto';
import { PlayerRepository } from '../../domain/PlayerRepository';
import { TeamRepository } from '@/lib/Team/domain/TeamRepository';
import { SubscriptionRepository } from '@/lib/Subscription/domain/SubscriptionRepository';
import { PlayerInvalidError } from '../../domain/PlayerInvalidError';
import { FieldPositionRepository } from '@/lib/FieldPosition/application/FieldPositionRepository';
import { EmptyPlayer } from '../../domain/PlayerSchema';
import { Effect, pipe } from 'effect';

export class PlayerCreate {
  constructor(
    private repository: PlayerRepository,
    private teamRepository: TeamRepository,
    private subscriptionRepository: SubscriptionRepository,
    private fieldPositionRepository: FieldPositionRepository,
  ) {}

  async run(dto: CreatePlayerDto) {
    const emptyPlayer = await Effect.runPromise(this.makeEmptyPlayer(dto));
    console.log(emptyPlayer);
    const createdPlayer = await this.repository.create(emptyPlayer);
    return createdPlayer;
  }

  makeEmptyPlayer(dto: CreatePlayerDto) {
    return pipe(
      dto,
      this.hasTeamId,
      Effect.flatMap(this.hasFullName),
      Effect.flatMap(this.hasPlayerEmail),
      Effect.flatMap(this.emailAlreadyExists),
      Effect.flatMap(this.hasDocument),
      Effect.flatMap(this.hasShirtName),
      Effect.flatMap(this.hasShirtSize),
      Effect.flatMap(this.hasDominantFoot),
      Effect.flatMap(this.documentAlreadyExists),
      Effect.flatMap(this.hasFavPosition),
      Effect.flatMap(this.validateFavPosition),
      Effect.flatMap(this.validateTeam),
      Effect.flatMap(this.validateSubscription),
      Effect.flatMap(this.mapEmptyPlayer),
    );
  }

  mapEmptyPlayer(
    dto: CreatePlayerDto,
  ): Effect.Effect<EmptyPlayer, never, never> {
    return Effect.succeed(
      EmptyPlayer.make({
        ...dto,
      }),
    );
  }

  hasTeamId = (dto: CreatePlayerDto) =>
    dto.teamId
      ? Effect.succeed(dto)
      : Effect.fail(new PlayerInvalidError('TeamId is required'));

  hasFullName = (dto: CreatePlayerDto) =>
    dto.firstName && dto.lastName
      ? Effect.succeed(dto)
      : Effect.fail(
          new PlayerInvalidError('First name and last name are required'),
        );

  hasPlayerEmail = (dto: CreatePlayerDto) =>
    dto.email
      ? Effect.succeed(dto)
      : Effect.fail(new PlayerInvalidError('Email is required'));

  hasDocument = (dto: CreatePlayerDto) =>
    dto.documentNumber && dto.documentType
      ? Effect.succeed(dto)
      : Effect.fail(
          new PlayerInvalidError('Document type and number are required'),
        );

  hasShirtName = (dto: CreatePlayerDto) =>
    dto.shirtName
      ? Effect.succeed(dto)
      : Effect.fail(new PlayerInvalidError('Shirt name is required'));

  hasFavPosition = (dto: CreatePlayerDto) =>
    dto.favPositionId
      ? Effect.succeed(dto)
      : Effect.fail(
          new PlayerInvalidError('Player must specify favorite position'),
        );

  hasShirtSize = (dto: CreatePlayerDto) =>
    dto.shirtSize
      ? Effect.succeed(dto)
      : Effect.fail(new PlayerInvalidError('Shirt size is required'));

  hasDominantFoot = (dto: CreatePlayerDto) =>
    dto.dominantFoot
      ? Effect.succeed(dto)
      : Effect.fail(new PlayerInvalidError('Dominant foot is required'));

  documentAlreadyExists = (dto: CreatePlayerDto) =>
    pipe(
      Effect.promise(() =>
        this.repository.getOneByDocumentNumber(dto.documentNumber),
      ),
      Effect.flatMap((a) =>
        a === null
          ? Effect.succeed(dto)
          : Effect.fail(new PlayerInvalidError('Player already exists')),
      ),
    );

  emailAlreadyExists = (dto: CreatePlayerDto) =>
    pipe(
      Effect.promise(() => this.repository.getOneByEmail(dto.email)),
      Effect.flatMap((a) =>
        a === null
          ? Effect.succeed(dto)
          : Effect.fail(new PlayerInvalidError('Player already exists')),
      ),
    );

  validateFavPosition = (dto: CreatePlayerDto) =>
    pipe(
      Effect.promise(() =>
        this.fieldPositionRepository.getOneById(dto.favPositionId),
      ),
      Effect.flatMap((a) =>
        a !== null
          ? Effect.succeed(dto)
          : Effect.fail(new PlayerInvalidError('Favorite position is invalid')),
      ),
    );

  validateTeam = (dto: CreatePlayerDto) =>
    pipe(
      Effect.promise(() => this.teamRepository.getOneById(dto.teamId)),
      Effect.flatMap((a) =>
        a === null || !a?.active
          ? Effect.fail(
              new PlayerInvalidError('Team not found or does not exists'),
            )
          : Effect.succeed({ dto, subscriptionId: a.subscriptionId }),
      ),
    );

  validateSubscription = ({
    dto,
    subscriptionId,
  }: {
    dto: CreatePlayerDto;
    subscriptionId: string;
  }) =>
    pipe(
      Effect.promise(() =>
        this.subscriptionRepository.getOneById(subscriptionId),
      ),
      Effect.flatMap((a) =>
        a === null || !a?.active
          ? Effect.fail(
              new PlayerInvalidError(
                'Subscription does not exists or is inactive',
              ),
            )
          : Effect.succeed(dto),
      ),
    );
}
