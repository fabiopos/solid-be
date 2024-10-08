import { TeamRepository } from '../../domain/TeamRepository';
import { Team } from '../../domain/Team';
import { CreateTeamDto } from '@/shared/dto/CreateTeamDto';

export class TeamCreate {
  constructor(private repository: TeamRepository) {}

  async run(dto: CreateTeamDto): Promise<void> {
    const team = Team.create(dto);
    await this.repository.create(team);
  }
}
