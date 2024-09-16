import { CreateSubscriptionDto } from '@/shared/dto/CreateSubscriptionDto';
import { SubscriptionRepository } from '../../domain/SubscriptionRepository';
import { Subscription } from '../../domain/Subscription';
import { TeamRepository } from '@/lib/Team/domain/TeamRepository';
import { Team } from '@/lib/Team/domain/Team';
import { PlanRepository } from '@/lib/Plan/domain/PlanRepository';
import { PlanNotFoundError } from '../../domain/PlanNotFoundError';
import { UserRepository } from '@/lib/User/domain/UserRepository';
import { UserAlreadyExistsError } from '@/lib/User/domain/UserAlreadyExistsError';
import { TeamNotProvidedError } from '@/lib/Team/domain/TeamNotProvidedError';
import { UserNoPolicyError } from '@/lib/User/domain/UserNoPolicyError';
import { UserInvalidError } from '@/lib/User/domain/UserInvalidError';

export class SubscriptionCreate {
  constructor(
    private repository: SubscriptionRepository,
    private teamRepository: TeamRepository,
    private planRepository: PlanRepository,
    private userRepository: UserRepository,
  ) {}

  async run(dto: CreateSubscriptionDto): Promise<Subscription> {
    const { user, teams, planId } = dto;
    const subscription = Subscription.create(dto);

    await this.validate(dto);

    const plan = await this.planRepository.getOneById(planId);
    if (!plan) throw new PlanNotFoundError();
    subscription.endDate = Subscription.calculateEndDate(plan);

    const createdSubscription = await this.repository.create(subscription);
    subscription.id = createdSubscription.id;

    // Create team
    const teamsPromises = teams.map((t) => {
      return this.teamRepository.create(
        Team.create({
          ...t,
          hasSubscription: true,
          subscriptionId: createdSubscription.id,
        }),
      );
    });
    const createdTeams = await Promise.all(teamsPromises);
    subscription.teams = createdTeams;

    // Create user
    user.subscriptionId = createdSubscription.id;
    const createdUser = await this.userRepository.create(user);
    subscription.users = [createdUser];

    return subscription;
  }

  async validate(dto: CreateSubscriptionDto): Promise<void> {
    const { user, planId, teams } = dto;

    if (teams.length === 0) throw new TeamNotProvidedError();

    if (!planId) throw new PlanNotFoundError();

    if (!user.email) throw new UserInvalidError('Email is required');
    if (!user.firstName) throw new UserInvalidError('First name is required');
    if (!user.lastName) throw new UserInvalidError('Last name is required');
    if (!user.password) throw new UserInvalidError('Password is requireed');
    if (user.policy === false) throw new UserNoPolicyError();

    const existingUser = await this.userRepository.getOneByEmail(user.email);
    if (existingUser) throw new UserAlreadyExistsError(user.email);
  }
}
