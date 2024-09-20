import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { PlayerGetAll } from '../../application/PlayerGetAll/PlayerGetAll';
import { PlayerCreate } from '../../application/PlayerCreate/PlayerCreate';
import { CreatePlayerPayload } from './Validations';
import {
  DocumentType,
  DominantFoot,
  ShirtSize,
} from '@/shared/enums/playerEnums';
import { ApiTags } from '@nestjs/swagger';

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

  @Get()
  async getAll() {
    return this.playerGetAll.run();
  }

  @Post()
  async create(@Body() player: CreatePlayerPayload) {
    return this.playerCreate.run({
      active: player.active,
      address: player.address,
      avatarUrl: player.avatarUrl,
      city: player.city,
      country: player.country,
      documentNumber: player.documentNumber,
      documentType: DocumentType[player.documentType],
      dominantFoot: DominantFoot[player.dominantFoot],
      email: player.email,
      firstName: player.firstName,
      height: player.height,
      lastName: player.lastName,
      phone: player.phone,
      shirtName: player.shirtName,
      shirtNumber: player.shirtNumber,
      shirtSize: ShirtSize[player.shirtSize],
      arl: player.arl,
      eps: player.eps,
      favPositionId: player.favPosition,
      teamId: player.teamId,
    });
  }
}
