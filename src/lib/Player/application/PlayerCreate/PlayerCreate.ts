import { CreatePlayerDto } from '@/shared/dto/CreatePlayerDto';
import { PlayerRepository } from '../../domain/PlayerRepository';
import { TeamRepository } from '@/lib/Team/domain/TeamRepository';
import { SubscriptionRepository } from '@/lib/Subscription/domain/SubscriptionRepository';
import { PlayerInvalidError } from '../../domain/PlayerInvalidError';
import { FieldPositionRepository } from '@/lib/FieldPosition/domain/FieldPositionRepository';
import { EmptyPlayer, FulfilledPlayer } from '../../domain/PlayerSchema';
import { Effect, pipe } from 'effect';
import { PlayerPositionRepository } from '@/lib/PlayerPosition/domain/PlayerPositionRepository';
import { EmptyPlayerPosition } from '@/lib/PlayerPosition/domain/PlayerPositionSchema';
import { Logger } from '@nestjs/common';

export class PlayerCreate {
  currentTeamPlayers: FulfilledPlayer[];
  constructor(
    private repository: PlayerRepository,
    private teamRepository: TeamRepository,
    private subscriptionRepository: SubscriptionRepository,
    private fieldPositionRepository: FieldPositionRepository,
    private playerPositionRepository: PlayerPositionRepository,
  ) {}

  private readonly logger = new Logger(PlayerCreate.name);

  async run(dto: CreatePlayerDto) {
    const emptyPlayer = await Effect.runPromise(this.makeEmptyPlayer(dto));
    const createdPlayer = await this.repository.create(emptyPlayer);
    const positionsToAdd = (emptyPlayer.playerPositions ?? []).map((p) =>
      EmptyPlayerPosition.make({
        player: createdPlayer,
        fieldPosition: { id: p.fieldPosition.id },
      }),
    );

    const positionsAdded =
      await this.playerPositionRepository.createAll(positionsToAdd);

    return FulfilledPlayer.make({
      ...createdPlayer,
      playerPositions: positionsAdded,
    });
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
      Effect.flatMap(this.hasShirtNumber),
      Effect.flatMap(this.validateShirtNumber),
      // validate shirtNumber
      Effect.flatMap(this.hasDominantFoot),
      Effect.flatMap(this.documentAlreadyExists),
      //Effect.flatMap(this.hasAtLeastOneFieldPosition),
      //Effect.flatMap(this.validateFavPosition),
      Effect.flatMap(this.validateTeam),
      Effect.flatMap(this.validateSubscription),
      Effect.flatMap(this.mapEmptyPlayer),
      Effect.flatMap(this.mapTeam),
      Effect.flatMap(this.mapFieldPositions),
      Effect.flatMap(this.mapPlayerPositions),
      Effect.flatMap(this.mapFavPosition),
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

  hasAtLeastOneFieldPosition = (dto: CreatePlayerDto) =>
    dto.fieldPositions.length > 0
      ? Effect.succeed(dto)
      : Effect.fail(
          new PlayerInvalidError(
            'Player must specify at least one field position',
          ),
        );

  hasShirtSize = (dto: CreatePlayerDto) =>
    dto.shirtSize
      ? Effect.succeed(dto)
      : Effect.fail(new PlayerInvalidError('Shirt size is required'));

  hasShirtNumber = (dto: CreatePlayerDto) =>
    dto.shirtNumber !== null
      ? Effect.succeed(dto)
      : Effect.fail(new PlayerInvalidError('Shirt number is required'));

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

  validateShirtNumber = (dto: CreatePlayerDto) => {
    return pipe(
      Effect.promise(() => this.repository.getAll(dto.teamId)), // get all players
      Effect.flatMap((a) =>
        Effect.succeed(
          a.map((x) => ({
            number: x.shirtNumber,
            firstName: x.firstName,
            lastName: x.lastName,
          })),
        ),
      ), // map names and numbers
      Effect.matchEffect({
        onSuccess: (shirtNumbers) =>
          Effect.succeed(
            shirtNumbers.find((x) => x.number === dto.shirtNumber),
          ),
        onFailure: () =>
          Effect.fail(
            new PlayerInvalidError(`Cannot get shirt numbers of team`),
          ),
      }), // player | null or error
      Effect.tap((a) => this.logger.log(a)),
      Effect.flatMap((player) =>
        !player
          ? Effect.succeed(dto)
          : Effect.fail(
              new PlayerInvalidError(
                `Shirt number ${dto.shirtNumber} is taken by ${player.firstName} ${player.lastName}`,
              ),
            ),
      ),
    );
  };

  mapTeam = (dto: EmptyPlayer) =>
    pipe(
      Effect.promise(() => this.teamRepository.getOneById(dto.teamId)),
      Effect.flatMap((a) =>
        a === null || !a?.active
          ? Effect.fail(
              new PlayerInvalidError('Team not found or does not exists'),
            )
          : Effect.succeed(
              EmptyPlayer.make({
                ...dto,
                team: { id: a.id },
              }),
            ),
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

  fetchFieldPosition = (fieldPositionId: string) =>
    Effect.tryPromise({
      try: () => this.fieldPositionRepository.getOneById(fieldPositionId),
      catch: () =>
        Effect.fail(
          new Error(`Cannot fetch field position ${fieldPositionId}`),
        ),
    }).pipe(
      Effect.matchEffect({
        onSuccess: (fieldPosition) => Effect.succeed(fieldPosition),
        onFailure: () => Effect.fail(new Error()),
      }),
    );

  fetchAllFieldPositions = (fieldPositions: string[]) =>
    pipe(
      fieldPositions,
      (a) => a.map((c) => this.fetchFieldPosition(c)),
      Effect.all,
    );

  mapFieldPositions = (emptyPlayer: EmptyPlayer) => {
    return pipe(
      emptyPlayer.fieldPositions ?? [],
      this.fetchAllFieldPositions,
      Effect.matchEffect({
        onFailure: () => Effect.fail(new Error('Cannot map field positions')),
        onSuccess: (fieldPositions) =>
          Effect.succeed(
            EmptyPlayer.make({
              ...emptyPlayer,
              fieldPositions: fieldPositions.map((x) => x.id),
            }),
          ),
      }),
    );
  };

  mapPlayerPositions = (emptyPlayer: EmptyPlayer) => {
    return pipe(
      emptyPlayer,
      (dto) =>
        Effect.succeed(
          dto.fieldPositions.map((x) => ({
            fieldPosition: { id: x },
          })),
        ),
      Effect.matchEffect({
        onFailure: () => Effect.fail(new Error()),
        onSuccess: (p) =>
          Effect.succeed(
            EmptyPlayer.make({ ...emptyPlayer, playerPositions: p }),
          ),
      }),
    );
  };

  mapFavPosition = (dto: EmptyPlayer) =>
    pipe(
      Effect.promise(() =>
        this.fieldPositionRepository.getOneById(dto.favPositionId),
      ),
      Effect.flatMap((a) =>
        a === null
          ? Effect.fail(new PlayerInvalidError('Fav position does not exists'))
          : Effect.succeed(
              EmptyPlayer.make({
                ...dto,
                favPosition: { id: a.id },
              }),
            ),
      ),
    );
}
