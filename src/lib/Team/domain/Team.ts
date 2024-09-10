import { CreateTeamDto } from '@/shared/dto/CreateTeamDto';

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

  static create(dto: CreateTeamDto): Team {
    const team = new Team();
    team.name = dto.name;
    team.active = dto.active;
    team.primaryColor = dto.primaryColor;
    team.secondaryColor = dto.secondaryColor;
    team.logoUrl = dto.logoUrl;
    team.shieldUrl = dto.shieldUrl;
    team.hasSubscription = dto.hasSubscription;
    return team;
  }
}
