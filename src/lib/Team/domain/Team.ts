// import { Subscription } from '@/lib/Subscription/domain/Subscription';
import { CreateTeamDto } from '../../../shared/dto/create-team.dto';

export class Team {
  id: string;
  name: string;
  active: boolean;
  primaryColor?: string | null;
  secondaryColor?: string | null;
  logoUrl?: string | null;
  shieldUrl?: string | null;
  createdAt: Date;
  hasSubscription: boolean;
  subscriptionId: string;

  static create(dto: CreateTeamDto): Team {
    const team = new Team();
    team.name = dto.name;
    team.active = dto.active;
    team.primaryColor = dto.primaryColor;
    team.secondaryColor = dto.secondaryColor;
    team.logoUrl = dto.logoUrl;
    team.shieldUrl = dto.shieldUrl;
    team.hasSubscription = dto.hasSubscription;
    team.subscriptionId = dto.subscriptionId;
    team.createdAt = dto.createdAt;
    return team;
  }
}
