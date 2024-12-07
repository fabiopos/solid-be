import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DashboardGet } from '../../application/DashboardGet/DashboardGet';

@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(
    @Inject('DashboardGet')
    private readonly dashboardGet: DashboardGet,
  ) {}

  @Get('/team-stats/:id')
  async getTeamStats(@Param() params: { id: string }) {
    const teamStats = await this.dashboardGet.getTeamStats(params.id);
    return teamStats;
  }

  @Get('last-players-added/:id')
  async getLastPlayersAdded(
    @Param() params: { id: string },
    @Query() query: { limit?: number },
  ) {
    const lastPlayersAdded = await this.dashboardGet.getLastPlayersAdded(
      params.id,
      query.limit,
    );
    return lastPlayersAdded;
  }

  @Get('last-matches')
  async getLastMatches() {
    return {};
  }

  @Get('top-scorers')
  async getTopScorers() {
    return {};
  }

  @Get('top-asists')
  async getAsists() {
    return {};
  }

  @Get('calendar')
  async getCalendar() {
    return {};
  }
}
