import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PlayerGetAll } from '../../application/PlayerGetAll/PlayerGetAll';
import { PlayerCreate } from '../../application/PlayerCreate/PlayerCreate';
import {
  CreatePlayerPayload,
  PlayerDetailsParams,
  PlayerFindParams,
  PlayerGetAllParams,
  PlayerQueryParams,
  UpdatePlayerPayload,
  UpdatePlayerPositionsPayload,
} from './Validations';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { isFiberFailure } from 'effect/Runtime';
import { PlayerDelete } from '../../application/PlayerDelete/PlayerDelete';
import { PlayerUpdate } from '../../application/PlayerUpdate/PlayerUpdate';
import { PartialPlayer } from '../../domain/PlayerSchema';
import { ParseError } from '@effect/schema/ParseResult';
import { JwtAuthGuard } from '@/lib/Auth/infraestructure/NestJs/jwt-auth.guard';
import { toDate } from 'date-fns';

@ApiTags('player')
@Controller('player')
export class PlayerController {
  constructor(
    @Inject('PlayerGetAll') private readonly playerGetAll: PlayerGetAll,
    @Inject('PlayerCreate') private readonly playerCreate: PlayerCreate,
    @Inject('PlayerDelete') private readonly playerDelete: PlayerDelete,
    @Inject('PlayerUpdate') private readonly playerUpdate: PlayerUpdate,
  ) {}

  private readonly logger = new Logger(PlayerController.name);

  @ApiParam({ name: 'teamId' })
  @Get(':teamId')
  @UseGuards(JwtAuthGuard)
  async getAll(@Param() params: PlayerGetAllParams) {
    const { teamId } = params;
    return this.playerGetAll.run(teamId);
  }

  @ApiParam({ name: 'playerId' })
  @Get(':pid/details')
  @UseGuards(JwtAuthGuard)
  async getPlayerDetails(@Param() params: PlayerDetailsParams) {
    const { pid } = params;
    return this.playerGetAll.find(pid);
  }

  // /player/{teamId}/search?name=pedro
  @ApiParam({ name: 'teamId' })
  @Get(':teamId/search')
  async searchByName(
    @Param() params: PlayerGetAllParams,
    @Query() query: PlayerQueryParams,
  ) {
    const { name } = query;
    const { teamId } = params;
    return this.playerGetAll.searchByName(teamId, name);
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

  @Patch(':id/field-positions')
  async updateFieldPositions(
    @Param() params: PlayerFindParams,
    @Body() payload: UpdatePlayerPositionsPayload,
  ) {
    try {
      const { id } = params;

      this.logger.log(
        'patch player field positions',
        payload.favPositionId,
        payload.fieldPositions,
      );

      return this.playerUpdate.updatePlayerPositions(
        id,
        payload.favPositionId,
        payload.fieldPositions,
      );
    } catch (error) {
      // console.log(error._id === 'ParseError', error instanceof ParseError);
      if (error instanceof ParseError) {
        throw new BadRequestException(error.message);
      }

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

      const dated = payload.bornDate;

      let birthDate: Date | undefined = undefined;
      if (payload.bornDate) {
        birthDate = toDate(payload.bornDate);
        this.logger.log('patch player', 'update player', dated, birthDate);
      }

      this.logger.log('patch player', 'avatar', payload.avatarUrl);
      return this.playerUpdate.run(
        id,
        PartialPlayer.make({
          ...payload,
          bornDate: birthDate,
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
