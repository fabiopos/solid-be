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
import { PlayerInjuryGet } from '../../application/PlayerInjuryGet/player-injury.get';
import { PlayerInjuryCreate } from '../../application/player-injury-create/player-injury.create';
import { PlayerInjuryDelete } from '../../application/player-injury-delete/player-injury.delete';
import { PlayerInjuryUpdate } from '../../application/PlayerInjuryUpdate/player-injury.update';
import {
  PlayerInjuryCreatePayload,
  PlayerInjuryGetByPlayerIdParams,
  PlayerInjuryUpdateParams,
  PlayerInjuryUpdatePayload,
} from './validations';
import {
  EmptyPlayerInjury,
  PartialPlayerInjury,
} from '../../domain/player-injury.schema';

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
