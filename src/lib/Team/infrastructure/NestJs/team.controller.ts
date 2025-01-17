import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TeamCreate } from '../../application/TeamCreate/TeamCreate';
import {
  CreateTeamPayload,
  DeleteTeamParams,
  TeamSearchParams,
  UpdateTeamParams,
  UpdateTeamPayload,
  ValidateTeamPayload,
} from './Validations';
import { TeamGetAll } from '../../application/TeamGetAll/TeamGetAll';
import { ApiTags } from '@nestjs/swagger';
import { TeamValidate } from '../../application/TeamValidate/TeamValidate';
import { TeamFind } from '../../application/TeamFind/TeamFind';
import { TeamResponse } from '../../domain/TeamSchema';
import { TeamUpdate } from '../../application/TeamUpdate/TeamUpdate';
import { Token } from '../../../../lib/auth/domain/auth-login.schema';
import { JwtAuthGuard } from '../../../../lib/auth/infraestructure/nestjs/jwt-auth.guard';
import { TeamDelete } from '../../application/TeamDelete/TeamDelete';

@ApiTags('team')
@Controller('team')
export class TeamController {
  constructor(
    @Inject('TeamCreate') private readonly teamCreate: TeamCreate,
    @Inject('TeamValidate') private readonly teamValidate: TeamValidate,
    @Inject('TeamGetAll') private readonly teamGetAll: TeamGetAll,
    @Inject('TeamFind') private readonly teamFind: TeamFind,
    @Inject('TeamUpdate') private readonly teamUpdate: TeamUpdate,
    @Inject('TeamDelete') private readonly teamDelete: TeamDelete,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll(@Req() request: Request & { user: Token }) {
    const subscriptionId = request.user.subscriptionId;
    const teams = await this.teamGetAll.run(subscriptionId);
    return teams;
  }

  @Get('/search')
  @UseGuards(JwtAuthGuard)
  async searchByName(
    @Query() params: TeamSearchParams,
    @Req() request: Request & { user: Token },
  ) {
    const { name } = params;
    const subscriptionId = request.user.subscriptionId;
    const teams = await this.teamGetAll.searchByName(name, subscriptionId);
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

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() team: CreateTeamPayload,
    @Req() request: Request & { user: Token },
  ) {
    const subscriptionId = request.user.subscriptionId;
    return this.teamCreate.run({
      active: team.active,
      name: team.name,
      primaryColor: team.primaryColor,
      secondaryColor: team.secondaryColor,
      logoUrl: team.logoUrl,
      shieldUrl: team.shieldUrl,
      hasSubscription: team.hasSubscription,
      subscriptionId,
    });
  }

  @Patch(':id')
  async update(
    @Param() params: UpdateTeamParams,
    @Body() team: UpdateTeamPayload,
  ) {
    return this.teamUpdate.run({
      id: params.id,
      logoUrl: team.logoUrl,
      name: team.name,
      primaryColor: team.primaryColor,
      secondaryColor: team.secondaryColor,
      shieldUrl: team.shieldUrl,
    });
  }

  @Delete(':id')
  async deleteTeam(@Param() params: DeleteTeamParams) {
    const { id } = params;
    return this.teamDelete.run(id);
  }
}
