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
  SubscriptionCreateResponse,
} from '../../domain/SubscriptionSchema';
import { Effect, pipe } from 'effect';
import { SubscriptionFeatureRepository } from '@/lib/SubscriptionFeature/domain/SubscriptionFeatureRepository';
import { subscriptionFeatureCreateSchema } from '@/lib/SubscriptionFeature/domain/SubscriptionFeatureSchema';
import { FeatureRepository } from '@/lib/Feature/domain/FeatureRepository';
import { FeatureT } from '@/lib/Feature/domain/FeatureSchema';

export class SubscriptionCreate {
  constructor(
    private repository: SubscriptionRepository,
    private teamRepository: TeamRepository,
    private planRepository: PlanRepository,
    private userRepository: UserRepository,
    private subFeatureRepository: SubscriptionFeatureRepository,
    private featureRepository: FeatureRepository,
  ) {}

  async run(dto: CreateSubscriptionDto): Promise<SubscriptionCreateResponse> {
    try {
      const emptySub = await this.validate(dto);
      const fulfilledSubscription = await this.createSubscription(emptySub);
      return SubscriptionCreateResponse.make({
        active: fulfilledSubscription.active,
        endDate: fulfilledSubscription.endDate,
        features: fulfilledSubscription.features,
        id: fulfilledSubscription.id,
        name: fulfilledSubscription.name,
        planId: fulfilledSubscription.planId,
        startDate: fulfilledSubscription.startDate,
        users: fulfilledSubscription.users,
        plan: fulfilledSubscription.plan,
        teams: fulfilledSubscription.teams,
      });
    } catch (error) {
      throw error;
    } finally {
    }
  }

  async validate(dto: CreateSubscriptionDto): Promise<EmptySubscription> {
    const res = await Effect.runPromiseExit(this.isValidDto(dto));
    const featuresToAdd = await this.getFeaturesToAdd('', dto.planId);
    switch (res._tag) {
      case 'Success':
        return new EmptySubscription({
          planId: dto.planId,
          plan: res.value,
          users: [dto.user],
          teams: dto.teams,
          features: featuresToAdd,
        });
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
  getFeaturesToAdd = async (subscriptionId: string, planId: string) => {
    const featuresEffect = await Effect.runPromise(
      this.getDefaultFeatures(planId),
    );

    return featuresEffect.map((x) =>
      subscriptionFeatureCreateSchema.make({
        feature: { id: x.id },
        subscription: { id: subscriptionId },
        max: x.defaultMax ?? 1,
        enabled: true,
      }),
    );
  };
}
