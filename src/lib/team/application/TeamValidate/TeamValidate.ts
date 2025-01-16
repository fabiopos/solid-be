import { TeamRepository } from '../../domain/TeamRepository';
import { TeamValidateInput } from '../../domain/TeamValidateInput';

export class TeamValidate {
  constructor(private teamRepository: TeamRepository) {}

  async run(payload: TeamValidateInput): Promise<boolean> {
    const team = await this.teamRepository.getOneByName(payload.teamName);
    return team !== null;
  }
}
