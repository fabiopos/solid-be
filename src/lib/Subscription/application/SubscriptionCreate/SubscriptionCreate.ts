import { CreateSubscriptionDto } from '@/shared/dto/CreateSubscriptionDto';
import { SubscriptionRepository } from '../../domain/SubscriptionRepository';
import { Subscription } from '../../domain/Subscription';
import { TeamRepository } from '@/lib/Team/domain/TeamRepository';
import { Team } from '@/lib/Team/domain/Team';
import { PlanRepository } from '@/lib/Plan/domain/PlanRepository';
import { PlanNotFoundError } from '../../domain/PlanNotFoundError';
import { UserRepository } from '@/lib/User/domain/UserRepository';
import { UserAlreadyExistsError } from '@/lib/User/domain/UserAlreadyExistsError';

export class SubscriptionCreate {
  constructor(
    private repository: SubscriptionRepository,
    private teamRepository: TeamRepository,
    private planRepository: PlanRepository,
    private userRepository: UserRepository,
  ) {}

  async run(dto: CreateSubscriptionDto): Promise<Subscription> {
    const { user, planId } = dto;
    const subscription = Subscription.create(dto);

    const plan = await this.planRepository.getOneById(planId);
    if (!plan) throw new PlanNotFoundError();

    const existingUser = await this.userRepository.getOneByEmail(user.email);
    if (existingUser) throw new UserAlreadyExistsError(user.email);

    subscription.endDate = Subscription.calculateEndDate(plan);

    const createdSubscription = await this.repository.create(subscription);
    subscription.id = createdSubscription.id;

    // Create team
    const { teams } = dto;
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
}
