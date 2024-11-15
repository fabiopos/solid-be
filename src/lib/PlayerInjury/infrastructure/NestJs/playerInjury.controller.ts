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
import { ApiTags } from '@nestjs/swagger';
import { PlayerInjuryGet } from '../../application/PlayerInjuryGet/PlayerInjuryGet';
import { PlayerInjuryCreate } from '../../application/PlayerInjuryCreate/PlayerInjuryCreate';
import { PlayerInjuryDelete } from '../../application/PlayerInjuryDelete/PlayerInjuryDelete';
import { PlayerInjuryUpdate } from '../../application/PlayerInjuryUpdate/PlayerInjuryUpdate';
import {
  PlayerInjuryCreatePayload,
  PlayerInjuryGetByPlayerIdParams,
  PlayerInjuryUpdateParams,
  PlayerInjuryUpdatePayload,
} from './Validations';
import {
  EmptyPlayerInjury,
  PartialPlayerInjury,
} from '../../domain/playerInjury.schema';

@ApiTags('player-injury')
@Controller('player-injury')
export class PlayerInjuryController {
  constructor(
    @Inject('PlayerInjuryGet') private readonly playerGetAll: PlayerInjuryGet,
    @Inject('PlayerInjuryCreate')
    private readonly playerCreate: PlayerInjuryCreate,
    @Inject('PlayerInjuryDelete')
    private readonly playerDelete: PlayerInjuryDelete,
    @Inject('PlayerInjuryUpdate')
    private readonly playerUpdate: PlayerInjuryUpdate,
  ) {}

  @Get(':playerId')
  getByPlayerId(@Param() params: PlayerInjuryGetByPlayerIdParams) {
    const { playerId } = params;
    return this.playerGetAll.getByPlayerId(playerId);
  }

  @Get('')
  getAll() {
    return this.playerGetAll.getAll();
  }

  @Post()
  create(@Body() payload: PlayerInjuryCreatePayload) {
    return this.playerCreate.run(EmptyPlayerInjury.make({ ...payload }));
  }

  @Patch(':playerInjuryId')
  update(
    @Param() params: PlayerInjuryUpdateParams,
    @Body() body: PlayerInjuryUpdatePayload,
  ) {
    return this.playerUpdate.run(
      params.playerInjuryId,
      PartialPlayerInjury.make(body),
    );
  }

  @Delete(':playerInjuryId')
  deleteInjury() {}
}
