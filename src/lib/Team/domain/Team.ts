export class Team {
  id: string;
  name: string;
  active: boolean;
  primaryColor?: string | null;
  secondaryColor?: string | null;
  logoUrl?: string | null;
  shieldUrl?: string | null;
  createdAt: Date;

  constructor(id: string, name: string, active: boolean) {
    this.id = id;
    this.name = name;
    this.active = active;
  }
}
