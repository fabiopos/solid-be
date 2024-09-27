import { CreateSubscriptionDto } from '@/shared/dto/CreateSubscriptionDto';
import { SubscriptionRepository } from '../../domain/SubscriptionRepository';
// import { Subscription } from '../../domain/Subscription';
import { TeamRepository } from '@/lib/Team/domain/TeamRepository';
import { Team } from '@/lib/Team/domain/Team';
import { PlanRepository } from '@/lib/Plan/domain/PlanRepository';
import { PlanNotFoundError } from '../../domain/PlanNotFoundError';
import { UserRepository } from '@/lib/User/domain/UserRepository';
import { UserAlreadyExistsError } from '@/lib/User/domain/UserAlreadyExistsError';
import { TeamNotProvidedError } from '@/lib/Team/domain/TeamNotProvidedError';
import { UserNoPolicyError } from '@/lib/User/domain/UserNoPolicyError';
import { UserInvalidError } from '@/lib/User/domain/UserInvalidError';
import {
  EmptySubscription,
  FulfilledSubscription,
} from '../../domain/SubscriptionSchema';
import { Effect, pipe } from 'effect';

export class SubscriptionCreate {
  constructor(
    private repository: SubscriptionRepository,
    private teamRepository: TeamRepository,
    private planRepository: PlanRepository,
    private userRepository: UserRepository,
  ) {}

  async run(dto: CreateSubscriptionDto): Promise<FulfilledSubscription> {
    // validate dto
    const emptySub = await this.validate(dto);

    // Create Subscription
    const createdSubscription = await this.createSubscription(emptySub);

    // Create teams
    const createdTeams = await this.createTeams(dto, createdSubscription.id);

    // Create user
    const createdUser = await this.createUser(dto, createdSubscription.id);

    const fulfilledSub = new FulfilledSubscription({
      ...createdSubscription,
      teams: createdTeams,
      users: [createdUser],
    });

    return fulfilledSub;
  }

  async validate(dto: CreateSubscriptionDto): Promise<EmptySubscription> {
    const res = await Effect.runPromiseExit(this.isValidDto(dto));

    switch (res._tag) {
      case 'Success':
        return new EmptySubscription({ planId: dto.planId, plan: res.value });
      case 'Failure':
        if (res.cause._tag === 'Fail') throw res.cause.error;
      default:
        throw new Error('Unknown error validating subscription');
    }
  }

  async createSubscription(emptySubscription: EmptySubscription) {
    return await this.repository.create({
      ...emptySubscription,
      startDate: emptySubscription.startDate,
      endDate: emptySubscription.endDate,
      name: emptySubscription.name,
      active: emptySubscription.active,
    });
  }

  async createTeams(dto: CreateSubscriptionDto, subscriptionId: string) {
    const { teams } = dto;
    const teamsPromises = teams.map((t) => {
      return this.teamRepository.create(
        Team.create({
          ...t,
          hasSubscription: true,
          subscriptionId,
        }),
      );
    });
    return await Promise.all(teamsPromises);
  }

  async createUser(dto: CreateSubscriptionDto, subscriptionId: string) {
    const { user } = dto;
    return await this.userRepository.create({ ...user, subscriptionId });
  }

  hasTeams = (dto: CreateSubscriptionDto) =>
    Effect.suspend(() =>
      dto.teams.length > 0
        ? Effect.succeed(dto)
        : Effect.fail(new TeamNotProvidedError()),
    );

  hasPlanId = (dto: CreateSubscriptionDto) =>
    Effect.suspend(() =>
      !!dto.planId ? Effect.succeed(dto) : Effect.fail(new PlanNotFoundError()),
    );

  hasUser = (dto: CreateSubscriptionDto) =>
    Effect.suspend(() =>
      !!dto.user
        ? Effect.succeed(dto)
        : Effect.fail(new UserInvalidError('User not provided')),
    );

  isPolicyAccepted = (dto: CreateSubscriptionDto) =>
    dto.user.policy
      ? Effect.succeed(dto)
      : Effect.fail(new UserNoPolicyError());

  getUser = (email: string) =>
    Effect.tryPromise({
      try: () => this.userRepository.getOneByEmail(email),
      catch: () => Effect.fail(new Error('Cannot get user')),
    });

  getPlan = (planId: string) =>
    Effect.tryPromise({
      try: () => this.planRepository.getOneById(planId),
      catch: () => Effect.fail(new Error('Cannot get plan')),
    });

  userAlreadyExists = (email: string) =>
    pipe(
      email,
      this.getUser,
      Effect.matchEffect({
        onFailure: () =>
          Effect.fail(
            new UserInvalidError(`Cannot get user with email ${email}`),
          ),
        onSuccess: (user) => Effect.succeed(!!user),
      }),
    );

  planExists = (planId: string) =>
    pipe(
      planId,
      this.getPlan,
      Effect.matchEffect({
        onFailure: () => Effect.fail(new PlanNotFoundError()),
        onSuccess: (plan) =>
          plan === null
            ? Effect.fail(new PlanNotFoundError())
            : Effect.succeed(plan),
      }),
    );

  isValidDto = (dto: CreateSubscriptionDto) =>
    pipe(
      dto,
      this.hasTeams,
      Effect.flatMap(this.hasPlanId),
      Effect.flatMap(this.hasUser),
      Effect.flatMap(this.isPolicyAccepted),
      Effect.map((dto) => dto.user.email),
      Effect.flatMap(this.userAlreadyExists),
      Effect.matchEffect({
        onSuccess: (exists) =>
          exists
            ? Effect.fail(new UserAlreadyExistsError(dto.user.email))
            : Effect.succeed(true),
        onFailure: (e) => Effect.fail(e),
      }),
      Effect.flatMap(() => this.planExists(dto.planId)),
    );
}
