import { UpdateTeamDto } from '../../../../shared/dto/update-team.dto';
import { TeamRepository } from '../../domain/TeamRepository';
import { TeamType } from '../../domain/TeamSchema';
import { TeamNotFoundError } from '../../domain/TeamNotFoundError';

export class TeamUpdate {
  constructor(private repository: TeamRepository) {}

  async run(dto: UpdateTeamDto) {
    const existingTeam = await this.repository.getOneById(dto.id);

    if (!existingTeam) throw new TeamNotFoundError();

    const teamToUpdate: TeamType = { ...existingTeam, ...dto };
    await this.repository.edit(teamToUpdate);
  }
}
