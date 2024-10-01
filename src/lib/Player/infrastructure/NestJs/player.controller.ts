import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { PlayerGetAll } from '../../application/PlayerGetAll/PlayerGetAll';
import { PlayerCreate } from '../../application/PlayerCreate/PlayerCreate';
import { CreatePlayerPayload, PlayerFindParams } from './Validations';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { isFiberFailure } from 'effect/Runtime';

@ApiTags('player')
@Controller('player')
export class PlayerController {
  constructor(
    @Inject('PlayerGetAll') private readonly playerGetAll: PlayerGetAll,
    @Inject('PlayerCreate') private readonly playerCreate: PlayerCreate,
  ) {}
  // constructor(
  //     @Inject('UserGetAll') private readonly userGetAll: UserGetAll,
  //     @Inject('UserGetOneById') private readonly userGetOneById: UserGetOneById,
  //     @Inject('UserCreate') private readonly userCreate: UserCreate,
  //     @Inject('UserEdit') private readonly userEdit: UserEdit,
  //     @Inject('UserDelete') private readonly userDelete: UserDelete,
  //   ) {}

  @ApiParam({ name: 'id' })
  @Get(':id')
  async getAll(@Param() params: PlayerFindParams) {
    const { id } = params;
    return this.playerGetAll.run(id);
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
}
