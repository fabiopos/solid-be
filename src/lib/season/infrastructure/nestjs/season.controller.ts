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
import { SeasonCreate } from '../../application/season.create';
import { SeasonGet } from '../../application/season.get';
import { SeasonUpdate } from '../../application/season.update';
import {
  SeasonCreatePayload,
  SeasonDeleteParams,
  SeasonParams,
  SeasonTreeByTeamParams,
  SeasonUpdateParams,
  SeasonUpdatePayload,
} from './validations';
import { EmptySeason, PartialSeason } from '../../domain/season.schema';
import { toDate } from 'date-fns';
import { SeasonDelete } from '../../application/season.delete';

@ApiTags('season')
@Controller('season')
export class SeasonController {
  constructor(
    @Inject('SeasonCreate')
    private readonly seasonCreate: SeasonCreate,
    @Inject('SeasonGet')
    private readonly seasonGet: SeasonGet,
    @Inject('SeasonUpdate')
    private readonly seasonUpdate: SeasonUpdate,
    @Inject('SeasonDelete')
    private readonly seasonDelete: SeasonDelete,
  ) {}

  @Get(':id')
  @ApiOkResponse({
    status: '2XX',
    description: 'Get all seasons by team',
  })
  async getAllSeason(@Param() params: SeasonParams) {
    const { id } = params;
    return this.seasonGet.run(id);
  }

  @Get(':id/details')
  @ApiOkResponse({
    status: '2XX',
    description: 'Find season details',
  })
  async findSeason(@Param() params: SeasonParams) {
    const { id } = params;
    return this.seasonGet.findSeason(id);
  }

  @Get(':id/tree')
  @ApiOkResponse({
    status: '2XX',
    description: 'Find season tree',
  })
  async getSeasonTree(@Param() params: SeasonTreeByTeamParams) {
    const { id } = params;
    return this.seasonGet.getSeasonTree(id);
  }

  @Get(':id/subscription')
  @ApiOkResponse({
    status: '2XX',
    description: 'Get all seasons by team',
  })
  async getAllSeasonBySubscription(@Param() params: SeasonParams) {
    const { id } = params;
    return this.seasonGet.bySubscription(id);
  }

  @Post(':id')
  async createSeason(
    @Param() params: SeasonParams,
    @Body() seasonPayload: SeasonCreatePayload,
  ) {
    try {
      return await this.seasonCreate.run(
        EmptySeason.make({
          teamId: params.id,
          endDate: toDate(seasonPayload.endDate),
          name: seasonPayload.name,
          startDate: toDate(seasonPayload.startDate),
          active: true,
          description: seasonPayload.description,
        }),
      );
    } catch (error) {
      throw error;
    }
  }

  @Patch(':seasonId')
  async updateSeason(
    @Body() payload: SeasonUpdatePayload,
    @Param() params: SeasonUpdateParams,
  ) {
    const { seasonId } = params;
    return this.seasonUpdate.run(
      seasonId,
      PartialSeason.make({
        ...payload,
        startDate: payload.startDate ? toDate(payload.startDate) : undefined,
        endDate: payload.endDate ? toDate(payload.endDate) : undefined,
      }),
    );
  }

  @Delete(':seasonId')
  async deleteSeason(@Param() params: SeasonDeleteParams) {
    const { seasonId } = params;
    return this.seasonDelete.run(seasonId);
  }
}
