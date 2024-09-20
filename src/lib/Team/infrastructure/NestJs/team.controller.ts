import { Body, Controller, Get, Inject, Patch, Post } from '@nestjs/common';
import { TeamCreate } from '../../application/TeamCreate/TeamCreate';
import { CreateTeamPayload, ValidateTeamPayload } from './Validations';
import { TeamGetAll } from '../../application/TeamGetAll/TeamGetAll';
import { ApiTags } from '@nestjs/swagger';
import { TeamValidate } from '../../application/TeamValidate/TeamValidate';

@ApiTags('team')
@Controller('team')
export class TeamController {
  constructor(
    @Inject('TeamCreate') private readonly teamCreate: TeamCreate,
    @Inject('TeamValidate') private readonly teamValidate: TeamValidate,
    @Inject('TeamGetAll') private readonly teamGetAll: TeamGetAll,
  ) {}

  @Get()
  async getAll() {
    return this.teamGetAll.run();
  }

  @Post('/validate')
  async validate(@Body() team: ValidateTeamPayload) {
    return this.teamValidate.run({ teamName: team.name });
  }

  @Patch()
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
