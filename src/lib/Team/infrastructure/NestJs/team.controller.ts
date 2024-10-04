import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { TeamCreate } from '../../application/TeamCreate/TeamCreate';
import { CreateTeamPayload, ValidateTeamPayload } from './Validations';
import { TeamGetAll } from '../../application/TeamGetAll/TeamGetAll';
import { ApiTags } from '@nestjs/swagger';
import { TeamValidate } from '../../application/TeamValidate/TeamValidate';
import { TeamFind } from '../../application/TeamFind/TeamFind';
import { TeamResponse } from '../../domain/TeamSchema';

@ApiTags('team')
@Controller('team')
export class TeamController {
  constructor(
    @Inject('TeamCreate') private readonly teamCreate: TeamCreate,
    @Inject('TeamValidate') private readonly teamValidate: TeamValidate,
    @Inject('TeamGetAll') private readonly teamGetAll: TeamGetAll,
    @Inject('TeamFind') private readonly teamFind: TeamFind,
  ) {}

  @Get()
  async getAll() {
    const teams = await this.teamGetAll.run();
    return teams;
  }

  @Get(':id')
  async getById(@Param() params: { id: string }) {
    const { id } = params;
    const team = await this.teamFind.run(id);
    return TeamResponse.make({ ...team, playersCount: team.playersCount });
  }

  @Post('/validate')
  async validate(@Body() team: ValidateTeamPayload) {
    return this.teamValidate.run({ teamName: team.name });
  }

  @Post()
  async create(@Body() team: CreateTeamPayload) {
    return this.teamCreate.run({
      active: team.active,
      name: team.name,
      primaryColor: team.primaryColor,
      secondaryColor: team.secondaryColor,
      logoUrl: team.logoUrl,
      shieldUrl: team.shieldUrl,
      hasSubscription: team.hasSubscription,
    });
  }
}
