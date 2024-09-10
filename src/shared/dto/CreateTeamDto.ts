export class CreateTeamDto {
  name: string;
  active: boolean;
  hasSubscription: boolean;
  primaryColor: string | null | undefined;
  secondaryColor: string | null | undefined;
  logoUrl: string | null | undefined;
  shieldUrl: string | null | undefined;
}
