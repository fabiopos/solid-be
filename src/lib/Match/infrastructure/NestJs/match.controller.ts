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
import { MatchCreate } from '../../application/MatchCreate';
import { MatchGet } from '../../application/MatchGet';
import { MatchUpdate } from '../../application/MatchUpdate';
import { MatchDelete } from '../../application/MatchDelete';
import {
  MatchCompetitionIdParams,
  MatchCreatePayload,
  MatchIdParams,
  MatchSeasonIdParams,
  MatchTeamIdParams,
  MatchUpdatePayload,
} from './Validations';
import { EmptyMatch } from '../../domain/MatchSchema';
import { toDate } from 'date-fns';

@ApiTags('match')
@Controller('match')
export class MatchController {
  constructor(
    @Inject('MatchCreate')
    private readonly matchCreate: MatchCreate,
    @Inject('MatchGet')
    private readonly matchGet: MatchGet,
    @Inject('MatchUpdate')
    private readonly matchUpdate: MatchUpdate,
    @Inject('MatchDelete')
    private readonly matchDelete: MatchDelete,
  ) {}

  @Get(':matchId')
  @ApiOkResponse({
    status: '2XX',
    description: 'Finds a match details by id',
  })
  async findById(@Param() params: MatchIdParams) {
    const { matchId } = params;
    return this.matchGet.findById(matchId);
  }

  @Get(':competitionId/competition')
  @ApiOkResponse({
    status: '2XX',
    description: 'Get all matches by competition',
  })
  async getByCompetition(@Param() params: MatchCompetitionIdParams) {
    const { competitionId } = params;
    return this.matchGet.getAllByCompetitionId(competitionId);
  }

  @Get(':teamId/team')
  @ApiOkResponse({
    status: '2XX',
    description: 'Get all matches by competition',
  })
  async getByTeam(@Param() params: MatchTeamIdParams) {
    const { teamId } = params;
    return this.matchGet.getAllByTeam(teamId);
  }

  @Get(':seasonId/season')
  @ApiOkResponse({
    status: '2XX',
    description: 'Get all matches by competition',
  })
  async getBySeason(@Param() params: MatchSeasonIdParams) {
    const { seasonId } = params;
    return this.matchGet.getBySeason(seasonId);
  }

  @Post()
  @ApiOkResponse({
    status: '2XX',
    description: 'Creates a match',
  })
  async addMatch(@Body() payload: MatchCreatePayload) {
    return this.matchCreate.run(
      EmptyMatch.make({
        awayTeamId: payload.awayTeamId,
        competitionId: payload.competitionId,
        homeTeamId: payload.homeTeamId,
        location: payload.location,
        matchDay: toDate(payload.matchDay),
        matchHour: toDate(payload.matchHour),
        title: payload.title,
        wo: payload.wo ?? false,
        completed: payload.completed ?? false,
      }),
    );
  }

  @Patch(':matchId')
  @ApiOkResponse({
    status: '2XX',
    description: 'Updates a match',
  })
  async updateMatch(
    @Param() params: MatchIdParams,
    @Body() payload: MatchUpdatePayload,
  ) {
    const { matchId } = params;
    return this.matchUpdate.run(
      matchId,
      EmptyMatch.make({
        awayTeamId: payload.awayTeamId,
        competitionId: payload.competitionId,
        homeTeamId: payload.homeTeamId,
        location: payload.location,
        matchDay: payload.matchDay ? toDate(payload.matchDay) : undefined,
        matchHour: payload.matchHour ? toDate(payload.matchHour) : undefined,
        title: payload.title,
        wo: payload.wo,
        completed: payload.completed,
        homeScore: payload.homeScore,
        awayScore: payload.awayScore,
      }),
    );
  }

  @Delete(':matchId')
  @ApiOkResponse({
    status: '2XX',
    description: 'Deletes a match',
  })
  async deleteMatch(@Param() params: MatchIdParams) {
    const { matchId } = params;
    return this.matchDelete.run(matchId);
  }
}
