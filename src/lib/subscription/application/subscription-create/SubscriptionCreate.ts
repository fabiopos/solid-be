import { CreateSubscriptionDto } from '@/shared/dto/create-subscription.dto';
import { SubscriptionRepository } from '../../domain/subscription.repository';
// import { Subscription } from '../../domain/Subscription';
import { TeamRepository } from '@/lib/team/domain/TeamRepository';
import { Team } from '@/lib/team/domain/Team';
import { PlanRepository } from '@/lib/plan/domain/plan.repository';
import { PlanNotFoundError } from '../../domain/plan-not-found-error';
import { UserRepository } from '@/lib/user/domain/UserRepository';
import { UserAlreadyExistsError } from '@/lib/user/domain/UserAlreadyExistsError';
import { TeamNotProvidedError } from '@/lib/team/domain/TeamNotProvidedError';
import { UserNoPolicyError } from '@/lib/user/domain/UserNoPolicyError';
import { UserInvalidError } from '@/lib/user/domain/UserInvalidError';
import {
  EmptySubscription,
  SubscriptionCreateResponse,
} from '../../domain/subscription.schema';
import { Effect, pipe } from 'effect';
import { SubscriptionFeatureRepository } from '@/lib/subscription-feature/domain/subscription-feature-repository';
import { subscriptionFeatureCreateSchema } from '@/lib/subscription-feature/domain/subscription-feature.schema';
import { FeatureRepository } from '@/lib/feature/domain/feature.repository';
import { FeatureT } from '@/lib/feature/domain/feature.schema';
import { encryptPassword } from '@/utils/encription';
import { UserEncryptError } from '@/lib/user/domain/UserEncryptError';
import { SubscriptionMapError } from '../../domain/subscription-map-error';
import { Logger } from '@nestjs/common';

export class SubscriptionCreate {
  constructor(
    private repository: SubscriptionRepository,
    private teamRepository: TeamRepository,
    private planRepository: PlanRepository,
    private userRepository: UserRepository,
    private subFeatureRepository: SubscriptionFeatureRepository,
    private featureRepository: FeatureRepository,
  ) {}

  private readonly logger = new Logger(SubscriptionCreate.name);

  async run(dto: CreateSubscriptionDto): Promise<SubscriptionCreateResponse> {
    try {
      const emptySub = await this.validate(dto);
      const fulfilledSubscription = await this.createSubscription(emptySub);
      return SubscriptionCreateResponse.make({
        id: fulfilledSubscription.id,
        name: fulfilledSubscription.name,
        startDate: fulfilledSubscription.startDate,
        endDate: fulfilledSubscription.endDate,
        active: fulfilledSubscription.active,
        isExpired: fulfilledSubscription.isExpired,
        planId: fulfilledSubscription.planId,
        plan: fulfilledSubscription.plan,
        users: fulfilledSubscription.users,
        features: fulfilledSubscription.features,
        teams: fulfilledSubscription.teams,
      });
    } catch (error) {
      throw error;
    } finally {
    }
  }

  async validate(dto: CreateSubscriptionDto): Promise<EmptySubscription> {
    const res = await Effect.runPromiseExit(this.makeEmptySubscription(dto));
    // dto.user.password = await encryptPassword(dto.user.password);
    switch (res._tag) {
      case 'Success':
        return res.value;
      case 'Failure':
        if (res.cause._tag === 'Fail') throw res.cause.error;
      default:
        this.logger.error(res);
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
    const hashedPwd = await encryptPassword(user.password);
    return await this.userRepository.create({
      ...user,
      password: hashedPwd,
      subscriptionId,
    });
  }

  hasTeams = (emptySub: EmptySubscription) =>
    emptySub.teams.length > 0
      ? Effect.succeed(emptySub)
      : Effect.fail(new TeamNotProvidedError());

  hasPlanId = (emptySub: EmptySubscription) =>
    Effect.suspend(() =>
      !!emptySub.planId
        ? Effect.succeed(emptySub)
        : Effect.fail(new PlanNotFoundError()),
    );

  hasUser = (emptySub: EmptySubscription) =>
    Effect.suspend(() =>
      (emptySub.users ?? []).length > 0
        ? Effect.succeed(emptySub)
        : Effect.fail(new UserInvalidError('User not provided')),
    );

  isPolicyAccepted = (emptySub: EmptySubscription) =>
    emptySub.users.every((u) => u.policy)
      ? Effect.succeed(emptySub)
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

  userAlreadyExists = (emptySub: EmptySubscription) =>
    pipe(
      emptySub.users[0].email, // todo: make this for several users
      this.getUser,
      Effect.matchEffect({
        onFailure: () =>
          Effect.fail(
            new UserInvalidError(
              `Cannot get user with email ${emptySub.users[0].email}`,
            ),
          ),
        onSuccess: (user) =>
          !!user
            ? Effect.fail(new UserAlreadyExistsError(emptySub.users[0].email))
            : Effect.succeed(emptySub),
      }),
    );

  planExists = (emptySub: EmptySubscription) =>
    pipe(
      emptySub.planId,
      this.getPlan,
      Effect.matchEffect({
        onFailure: () => Effect.fail(new PlanNotFoundError()),
        onSuccess: (plan) =>
          plan === null
            ? Effect.fail(new PlanNotFoundError())
            : Effect.succeed(EmptySubscription.make({ ...emptySub, plan })),
      }),
    );

  encryptSingle = (password: string) =>
    Effect.tryPromise({
      try: () => encryptPassword(password),
      catch: () => Effect.fail(new UserEncryptError('Cannot encrypt password')),
    });

  encryptUserPassword = (emptySub: EmptySubscription) => {
    return pipe(
      emptySub.users[0].password,
      this.encryptSingle,
      Effect.matchEffect({
        onSuccess: (encriptedPassword: string) =>
          Effect.succeed(
            EmptySubscription.make({
              ...emptySub,
              users: [{ ...emptySub.users[0], password: encriptedPassword }],
            }),
          ),
        onFailure: (error) => error,
      }),
    );
  };

  mapDtoToEmptySubscription(dto: CreateSubscriptionDto) {
    return Effect.succeed(
      EmptySubscription.make({
        planId: dto.planId,
        teams: dto.teams,
        features: [],
        plan: dto.plan,
        users: [dto.user],
      }),
    );
  }

  fetchFeaturesToAdd = (planId: string) =>
    Effect.tryPromise({
      try: () => this.getFeaturesToAdd(planId),
      catch: () => new SubscriptionMapError('Cannot map features'),
    });

  mapFeaturesToEmptySubscrition = (emptySub: EmptySubscription) => {
    return pipe(
      emptySub.planId,
      this.fetchFeaturesToAdd,
      Effect.matchEffect({
        onSuccess: (featuresToAdd) =>
          Effect.succeed(
            EmptySubscription.make({ ...emptySub, features: featuresToAdd }),
          ),
        onFailure: (error) => Effect.fail(error),
      }),
    );
  };

  makeEmptySubscription(dto: CreateSubscriptionDto) {
    return pipe(
      dto,
      this.mapDtoToEmptySubscription,
      Effect.flatMap(this.hasTeams),
      Effect.flatMap(this.hasPlanId),
      Effect.flatMap(this.planExists),
      Effect.flatMap(this.hasUser),
      Effect.flatMap(this.userAlreadyExists),
      Effect.flatMap(this.encryptUserPassword),
      Effect.flatMap(this.isPolicyAccepted),
      Effect.flatMap(this.userAlreadyExists),
      Effect.flatMap(this.mapFeaturesToEmptySubscrition),
    );
  }

  getAllFeatures = () =>
    Effect.tryPromise({
      try: () => this.featureRepository.getAll(),
      catch: () => Effect.fail(new Error('Cannot get plan')),
    });

  // Promise<FeatureT[]>
  getDefaultFeatures = (planId: string) => {
    const keysPerPlan = {
      FREE: ['users-mng', 'teams-mng', 'seasons-mng', 'players-mng'],
      PRO: [
        'users-mng',
        'teams-mng',
        'seasons-mng',
        'players-mng',
        'lineups-ctor',
      ],
      STANDARD_ANUAL: [
        'users-mng',
        'teams-mng',
        'seasons-mng',
        'players-mng',
        'lineups-ctor',
      ],
      STANDARD_MONTH: [
        'users-mng',
        'teams-mng',
        'seasons-mng',
        'players-mng',
        'lineups-ctor',
      ],
    };
    // const featureKeys = keysPerPlan[planId];
    // const features = await this.featureRepository.getAll();
    // return features.filter((x) => featureKeys.some(x.id));
    return pipe(
      null,
      this.getAllFeatures,
      Effect.matchEffect({
        onSuccess: (value: FeatureT[]) => Effect.succeed(value),
        onFailure: () => Effect.fail(new Error('Cannot get Features')),
      }),
      Effect.map((x) =>
        x.filter((x) => keysPerPlan[planId]?.some((y) => y === x.id)),
      ),
    );
  };

  addFeaturesToSubscription = async (
    subscriptionId: string,
    planId: string,
  ) => {
    const featuresEffect = await Effect.runPromise(
      this.getDefaultFeatures(planId),
    );

    const schemas = featuresEffect.map((x) =>
      subscriptionFeatureCreateSchema.make({
        feature: { id: x.id },
        subscription: { id: subscriptionId },
        max: x.defaultMax ?? 1,
        enabled: true,
      }),
    );

    return await this.subFeatureRepository.createItems(schemas);
  };

  getFeaturesToAdd = async (planId: string) => {
    const featuresEffect = await Effect.runPromise(
      this.getDefaultFeatures(planId),
    );

    return featuresEffect.map((x) =>
      subscriptionFeatureCreateSchema.make({
        feature: { id: x.id },
        subscription: { id: '' },
        max: x.defaultMax ?? 1,
        enabled: true,
      }),
    );
  };
}
