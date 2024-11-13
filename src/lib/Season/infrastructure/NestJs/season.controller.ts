import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SeasonCreate } from '../../application/SeasonCreate';
import { SeasonGet } from '../../application/SeasonGet';
import { SeasonUpdate } from '../../application/SeasonUpdate';
import { SeasonCreatePayload, SeasonParams } from './Validations';
import { EmptySeason } from '../../domain/SeasonSchema';
import { toDate } from 'date-fns';

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
}
