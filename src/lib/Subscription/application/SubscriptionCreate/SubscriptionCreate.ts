import { CreateSubscriptionDto } from '@/shared/dto/CreateSubscriptionDto';
import { SubscriptionRepository } from '../../domain/SubscriptionRepository';
import { Subscription } from '../../domain/Subscription';
import { TeamRepository } from '@/lib/Team/domain/TeamRepository';
import { Team } from '@/lib/Team/domain/Team';
import { PlanRepository } from '@/lib/Plan/domain/PlanRepository';
import { PlanNotFoundError } from '../../domain/PlanNotFoundError';

export class SubscriptionCreate {
  constructor(
    private repository: SubscriptionRepository,
    private teamRepository: TeamRepository,
    private planRepository: PlanRepository,
  ) {}

  async run(dto: CreateSubscriptionDto): Promise<Subscription> {
    const subscription = Subscription.create(dto);

    const plan = await this.planRepository.getOneById(dto.planId);

    if (!plan) throw new PlanNotFoundError();

    subscription.endDate = Subscription.calculateEndDate(plan);
    console.log(plan, subscription.endDate);

    const createdSubscription = await this.repository.create(subscription);
    subscription.id = createdSubscription.id;
    console.log('created subscription', createdSubscription);

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

    console.log('created teams', createdTeams);

    // create user

    // Create a new subscription

    subscription.teams = createdTeams;

    console.log('subscription to add', subscription);

    return subscription;
  }
}
