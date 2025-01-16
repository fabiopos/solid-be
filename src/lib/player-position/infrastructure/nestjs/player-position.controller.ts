import { Body, Controller, Get, Inject, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PlayerPositionGet } from '../../application/player-position.get';
import { PlayerPositionCreate } from '../../application/player-position.create';
import { PlayerPositionUpsertPayload } from './Validations';

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
}
