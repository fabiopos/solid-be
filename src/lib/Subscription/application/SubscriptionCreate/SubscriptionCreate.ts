import { CreateSubscriptionDto } from '@/shared/dto/CreateSubscriptionDto';
import { SubscriptionRepository } from '../../domain/SubscriptionRepository';
import { Subscription } from '../../domain/Subscription';
import { TeamRepository } from '@/lib/Team/domain/TeamRepository';
import { Team } from '@/lib/Team/domain/Team';

export class SubscriptionCreate {
  constructor(
    private repository: SubscriptionRepository,
    private teamRepository: TeamRepository,
  ) {}

  async run(dto: CreateSubscriptionDto): Promise<Subscription> {
    // Create team
    const { teams } = dto;
    const teamsPromises = teams.map((t) => {
      return this.teamRepository.create(Team.create(t));
    });
    const createdTeams = await Promise.all(teamsPromises);

    console.log('created teams', createdTeams);

    // create user

    // Create a new subscription
    const subscription = Subscription.create(dto);
    subscription.teams = createdTeams;

    console.log('subscription to add', subscription);
    const createdSubscription = await this.repository.create(subscription);

    console.log('created subscription', createdSubscription);

    return subscription;
  }
}
