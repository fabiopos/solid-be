export class CreateTeamDto {
  name: string;
  active: boolean;
  primaryColor?: string | null;
  secondaryColor?: string | null;
  logoUrl?: string | null;
  shieldUrl?: string | null;
  createdAt?: Date | null;
  hasSubscription: boolean;
}
