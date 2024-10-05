import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PlayerGetAll } from '../../application/PlayerGetAll/PlayerGetAll';
import { PlayerCreate } from '../../application/PlayerCreate/PlayerCreate';
import {
  CreatePlayerPayload,
  PlayerFindParams,
  PlayerGetAllParams,
  UpdatePlayerPayload,
} from './Validations';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { isFiberFailure } from 'effect/Runtime';
import { PlayerDelete } from '../../application/PlayerDelete/PlayerDelete';
import { PlayerUpdate } from '../../application/PlayerUpdate/PlayerUpdate';
import { PartialPlayer } from '../../domain/PlayerSchema';
import { ParseError } from '@effect/schema/ParseResult';

@ApiTags('player')
@Controller('player')
export class PlayerController {
  constructor(
    @Inject('PlayerGetAll') private readonly playerGetAll: PlayerGetAll,
    @Inject('PlayerCreate') private readonly playerCreate: PlayerCreate,
    @Inject('PlayerDelete') private readonly playerDelete: PlayerDelete,
    @Inject('PlayerUpdate') private readonly playerUpdate: PlayerUpdate,
  ) {}

  @ApiParam({ name: 'teamId' })
  @Get(':teamId')
  async getAll(@Param() params: PlayerGetAllParams) {
    const { teamId } = params;
    return this.playerGetAll.run(teamId);
  }

  @Post()
  async create(@Body() player: CreatePlayerPayload) {
    try {
      const result = await this.playerCreate.run({
        ...player,
      });
      return result;
    } catch (error) {
      if (isFiberFailure(error)) throw new BadRequestException(error.message);

      throw error;
    }
  }

  @Patch(':id')
  async update(
    @Param() params: PlayerFindParams,
    @Body() payload: UpdatePlayerPayload,
  ) {
    try {
      const { id } = params;
      return this.playerUpdate.run(
        id,
        PartialPlayer.make({
          ...payload,
        }),
      );
    } catch (error) {
      // console.log(error._id === 'ParseError', error instanceof ParseError);
      if (error instanceof ParseError) {
        throw new BadRequestException(error.message);
      }

      throw error;
    }
  }

  @ApiParam({ name: 'id' })
  @Delete(':id')
  async deletePlayer(@Param() params: PlayerFindParams) {
    const { id } = params;
    return this.playerDelete.run(id);
  }
}
