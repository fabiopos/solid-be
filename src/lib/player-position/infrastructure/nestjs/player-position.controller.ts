import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PlayerPositionGet } from '../../application/player-position.get';
import { PlayerPositionCreate } from '../../application/player-position.create';
import { LineupDto, PlayerPositionUpsertPayload } from './validations';

@ApiTags('player-position')
@Controller('player-position')
export class PlayerPositionController {
  constructor(
    @Inject('PlayerPositionGet')
    private readonly playerGetAll: PlayerPositionGet,
    @Inject('PlayerPositionCreate')
    private readonly playerCreate: PlayerPositionCreate,
  ) {}

  @Get(':playerId')
  async getPositionsByPlayer(@Param() params: { playerId: string }) {
    const { playerId } = params;
    return this.playerGetAll.run(playerId);
  }

  @Patch(':playerId')
  async upsertPlayerPositions(
    @Body() body: PlayerPositionUpsertPayload,
    @Param() params: { playerId: string },
  ) {
    const { playerId } = params;
    const { positions } = body;

    return this.playerCreate.upsert(playerId, positions);
  }

  @Post('lineup')
  async saveLineup(@Body() body: LineupDto) {
    const updates = body.positions.reduce(
      (acc, { playerId, positionId }) => {
        if (!acc[playerId]) acc[playerId] = [];
        acc[playerId].push(positionId);
        return acc;
      },
      {} as Record<string, string[]>,
    );

    const results = await Promise.all(
      Object.entries(updates).map(([playerId, positions]) =>
        this.playerCreate.upsert(playerId, positions),
      ),
    );

    return results.flat();
  }
}
