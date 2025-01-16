import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DashboardGet } from '../../application/gashboard-get/dashboard.get';

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

  @Get('last-matches/:id')
  async getLastMatches(
    @Param() params: { id: string },
    @Query() query: { limit?: number },
  ) {
    const lastMatches = await this.dashboardGet.getLastMatches(
      params.id,
      query.limit,
    );
    return lastMatches;
  }

  @Get('next-matches/:id')
  async getNextMatches(
    @Param() params: { id: string },
    @Query() query: { limit?: number },
  ) {
    const nextMatches = await this.dashboardGet.getNextMatches(
      params.id,
      query.limit,
    );
    return nextMatches;
  }

  @Get('top-scorers/:id')
  async getTopScorers(
    @Param() params: { id: string },
    //@Query() query: { limit?: number },
  ) {
    const topScorers = await this.dashboardGet.getTopScorers(params.id);
    return topScorers;
  }

  @Get('top-asists/:id')
  async getAsists(@Param() params: { id: string }) {
    const topAssists = await this.dashboardGet.getTopAsists(params.id);
    return topAssists;
  }

  @Get('calendar/:id')
  async getCalendar(@Param() params: { id: string }) {
    const allMatches = await this.dashboardGet.getCalendar(params.id);
    return allMatches;
  }
}
