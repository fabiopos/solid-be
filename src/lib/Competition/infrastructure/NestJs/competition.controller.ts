import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CompetitionGet } from '../../application/competition.get';
import { CompetitionCreate } from '../../application/competition.create';
import { CompetitionUpdate } from '../../application/competition.update';
import { CompetitionDelete } from '../../application/competition.delete';
import {
  CompetitionByIdParams,
  CompetitionBySeasonParams,
  CompetitionByTeamParams,
  CompetitionCreatePayload,
  CompetitionUpdatePayload,
} from './validations';
import { EmptyCompetition } from '../../domain/competition.schema';
import { toDate } from 'date-fns';

@ApiTags('competition')
@Controller('competition')
export class CompetitionController {
  constructor(
    @Inject('CompetitionGet')
    private readonly competitionGet: CompetitionGet,

    @Inject('CompetitionCreate')
    private readonly competitionCreate: CompetitionCreate,

    @Inject('CompetitionUpdate')
    private readonly competitionUpdate: CompetitionUpdate,

    @Inject('CompetitionDelete')
    private readonly competitionDelete: CompetitionDelete,
  ) {}

  @Get(':id')
  @ApiOkResponse({
    status: '2XX',
    description: 'Get all competitions by season',
  })
  async findCompetitionVyId(@Param() params: { id: string }) {
    const { id } = params;
    return this.competitionGet.findById(id);
  }

  @Get(':seasonId/season')
  @ApiOkResponse({
    status: '2XX',
    description: 'Get all competitions by season',
  })
  async getAllCompetitionsBySeason(@Param() params: CompetitionBySeasonParams) {
    const { seasonId } = params;
    return this.competitionGet.getAllBySeason(seasonId);
  }

  @Get(':teamId/team')
  @ApiOkResponse({
    status: '2XX',
    description: 'Get all competitions by team',
  })
  async getAllCompetitionsByTeam(@Param() params: CompetitionByTeamParams) {
    const { teamId } = params;
    return this.competitionGet.getAllByTeam(teamId);
  }

  @Post(':seasonId')
  async createCompetition(
    @Param() params: CompetitionBySeasonParams,
    @Body() payload: CompetitionCreatePayload,
  ) {
    const { seasonId } = params;
    return this.competitionCreate.run(
      EmptyCompetition.make({
        description: payload.description,
        name: payload.name,
        seasonId: seasonId,
        startDate: toDate(payload.startDate),
        endDate: toDate(payload.endDate),
        status: payload.status,
      }),
    );
  }

  @Patch(':competitionId')
  async updateCompetition(
    @Param() params: CompetitionByIdParams,
    @Body() payload: CompetitionUpdatePayload,
  ) {
    const { competitionId } = params;
    return this.competitionUpdate.run(
      competitionId,
      EmptyCompetition.make({
        description: payload.description,
        name: payload.name,
        startDate: payload.startDate ? toDate(payload.startDate) : undefined,
        endDate: payload.endDate ? toDate(payload.endDate) : undefined,
        status: payload.status,
      }),
    );
  }

  @Delete(':competitionId')
  async removeCompetition(@Param() params: CompetitionByIdParams) {
    const { competitionId } = params;
    return this.competitionDelete.run(competitionId);
  }
}
