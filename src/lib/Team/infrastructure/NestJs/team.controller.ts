import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { TeamCreate } from '../../application/TeamCreate/TeamCreate';
import { CreateTeamPayload } from './Validations';
import { TeamGetAll } from '../../application/TeamGetAll/TeamGetAll';

@Controller('team')
export class TeamController {
  constructor(
    @Inject('TeamCreate') private readonly teamCreate: TeamCreate,
    @Inject('TeamGetAll') private readonly teamGetAll: TeamGetAll,
  ) {}

  @Get()
  async getAll() {
    return this.teamGetAll.run();
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
